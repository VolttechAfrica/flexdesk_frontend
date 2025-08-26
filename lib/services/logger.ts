
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogContext {
  userId?: string
  requestId?: string
  component?: string
  action?: string
  [key: string]: any
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
  error?: Error
  data?: any
}

class Logger {
  private static instance: Logger
  private logLevel: LogLevel
  private isDevelopment: boolean
  private isProduction: boolean

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.isProduction = process.env.NODE_ENV === 'production'
    
    const envLogLevel = process.env.NEXT_PUBLIC_LOG_LEVEL
    if (envLogLevel) {
      this.logLevel = LogLevel[envLogLevel.toUpperCase() as keyof typeof LogLevel] || LogLevel.INFO
    } else {
      this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext, error?: Error, data?: any): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
      data
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined
      }
    }

    return entry
  }

  private outputLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return

    const { timestamp, level, message, context, error, data } = entry
    const levelName = LogLevel[level]
    const prefix = `[${timestamp}] [${levelName}]`

    if (this.isDevelopment) {
      const consoleMethod = this.getConsoleMethod(level)
      consoleMethod(prefix, message, { context, error, data })
      return
    }

    if (this.isProduction) {
      const consoleMethod = this.getConsoleMethod(level)
      consoleMethod(JSON.stringify(entry))
      // TODO: Send to external logging service (e.g., Sentry, LogRocket, etc.)
      // this.sendToExternalService(entry)
    }
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug
      case LogLevel.INFO:
        return console.info
      case LogLevel.WARN:
        return console.warn
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        return console.error
      default:
        return console.log
    }
  }

  // Public logging methods
  public debug(message: string, context?: LogContext, data?: any): void {
    this.outputLog(this.formatMessage(LogLevel.DEBUG, message, context, undefined, data))
  }

  public info(message: string, context?: LogContext, data?: any): void {
    this.outputLog(this.formatMessage(LogLevel.INFO, message, context, undefined, data))
  }

  public warn(message: string, context?: LogContext, data?: any): void {
    this.outputLog(this.formatMessage(LogLevel.WARN, message, context, undefined, data))
  }

  public error(message: string, error?: Error, context?: LogContext, data?: any): void {
    this.outputLog(this.formatMessage(LogLevel.ERROR, message, context, error, data))
  }

  public fatal(message: string, error?: Error, context?: LogContext, data?: any): void {
    this.outputLog(this.formatMessage(LogLevel.FATAL, message, context, error, data))
  }

  // Convenience methods for common logging patterns
  public logApiRequest(method: string, url: string, requestId: string, data?: any): void {
    this.info(`API Request: ${method} ${url}`, { requestId, action: 'api_request' }, data)
  }

  public logApiResponse(status: number, url: string, requestId: string, data?: any): void {
    this.info(`API Response: ${status} ${url}`, { requestId, action: 'api_response' }, data)
  }

  public logApiError(status: number, url: string, requestId: string, error: Error, data?: any): void {
    this.error(`API Error: ${status} ${url}`, error, { requestId, action: 'api_error' }, data)
  }

  public logAuthEvent(event: string, userId?: string, data?: any): void {
    this.info(`Auth Event: ${event}`, { userId, action: 'auth_event' }, data)
  }

  public logUserAction(action: string, userId?: string, data?: any): void {
    this.info(`User Action: ${action}`, { userId, action: 'user_action' }, data)
  }

  public logSecurityEvent(event: string, userId?: string, data?: any): void {
    this.warn(`Security Event: ${event}`, { userId, action: 'security_event' }, data)
  }

  // Performance logging
  public logPerformance(operation: string, duration: number, context?: LogContext): void {
    this.info(`Performance: ${operation} took ${duration}ms`, context, { duration, operation })
  }

  // Error boundary logging
  public logErrorBoundary(error: Error, errorInfo: any, context?: LogContext): void {
    this.error('React Error Boundary caught error', error, context, { errorInfo })
  }

  // Set log level dynamically
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level
  }

  // Get current log level
  public getLogLevel(): LogLevel {
    return this.logLevel
  }

  // Check if a level is enabled
  public isLevelEnabled(level: LogLevel): boolean {
    return this.shouldLog(level)
  }
}

// Export singleton instance
export const logger = Logger.getInstance()

// Export convenience functions for direct use
export const log = {
  debug: (message: string, context?: LogContext, data?: any) => logger.debug(message, context, data),
  info: (message: string, context?: LogContext, data?: any) => logger.info(message, context, data),
  warn: (message: string, context?: LogContext, data?: any) => logger.warn(message, context, data),
  error: (message: string, error?: Error, context?: LogContext, data?: any) => logger.error(message, error, context, data),
  fatal: (message: string, error?: Error, context?: LogContext, data?: any) => logger.fatal(message, error, context, data),
  
  // Convenience methods
  api: {
    request: (method: string, url: string, requestId: string, data?: any) => logger.logApiRequest(method, url, requestId, data),
    response: (status: number, url: string, requestId: string, data?: any) => logger.logApiResponse(status, url, requestId, data),
    error: (status: number, url: string, requestId: string, error: Error, data?: any) => logger.logApiError(status, url, requestId, error, data),
  },
  
  auth: (event: string, userId?: string, data?: any) => logger.logAuthEvent(event, userId, data),
  user: (action: string, userId?: string, data?: any) => logger.logUserAction(action, userId, data),
  security: (event: string, userId?: string, data?: any) => logger.logSecurityEvent(event, userId, data),
  performance: (operation: string, duration: number, context?: LogContext) => logger.logPerformance(operation, duration, context),
  errorBoundary: (error: Error, errorInfo: any, context?: LogContext) => logger.logErrorBoundary(error, errorInfo, context),
}
