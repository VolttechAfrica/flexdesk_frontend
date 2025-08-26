export default function formatUserId(userId: string): string {
  return userId.replace(/\//g, "_")
}