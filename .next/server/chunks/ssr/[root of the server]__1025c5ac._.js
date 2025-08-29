module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/hooks/use-toast.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "reducer": (()=>reducer),
    "toast": (()=>toast),
    "useToast": (()=>useToast)
});
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(memoryState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
;
}}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}}),
"[project]/components/ui/toast.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toast": (()=>Toast),
    "ToastAction": (()=>ToastAction),
    "ToastClose": (()=>ToastClose),
    "ToastDescription": (()=>ToastDescription),
    "ToastProvider": (()=>ToastProvider),
    "ToastTitle": (()=>ToastTitle),
    "ToastViewport": (()=>ToastViewport)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, this));
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive border-destructive bg-destructive text-destructive-foreground text-white"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
});
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, this));
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, this));
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this));
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, this));
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}}),
"[project]/components/ui/toaster.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function Toaster() {
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/lib/services/logger.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LogLevel": (()=>LogLevel),
    "log": (()=>log),
    "logger": (()=>logger)
});
var LogLevel = /*#__PURE__*/ function(LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 4] = "FATAL";
    return LogLevel;
}({});
class Logger {
    static instance;
    logLevel;
    isDevelopment;
    isProduction;
    constructor(){
        this.isDevelopment = ("TURBOPACK compile-time value", "development") === 'development';
        this.isProduction = ("TURBOPACK compile-time value", "development") === 'production';
        const envLogLevel = ("TURBOPACK compile-time value", "INFO");
        if ("TURBOPACK compile-time truthy", 1) {
            this.logLevel = LogLevel[envLogLevel.toUpperCase()] || 1;
        } else {
            "TURBOPACK unreachable";
        }
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    shouldLog(level) {
        return level >= this.logLevel;
    }
    formatMessage(level, message, context, error, data) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            context,
            error,
            data
        };
        if (error) {
            entry.error = {
                name: error.name,
                message: error.message,
                stack: this.isDevelopment ? error.stack : undefined
            };
        }
        return entry;
    }
    outputLog(entry) {
        if (!this.shouldLog(entry.level)) return;
        const { timestamp, level, message, context, error, data } = entry;
        const levelName = LogLevel[level];
        const prefix = `[${timestamp}] [${levelName}]`;
        if (this.isDevelopment) {
            const consoleMethod = this.getConsoleMethod(level);
            consoleMethod(prefix, message, {
                context,
                error,
                data
            });
            return;
        }
        if (this.isProduction) {
            const consoleMethod = this.getConsoleMethod(level);
            consoleMethod(JSON.stringify(entry));
        // TODO: Send to external logging service (e.g., Sentry, LogRocket, etc.)
        // this.sendToExternalService(entry)
        }
    }
    getConsoleMethod(level) {
        switch(level){
            case 0:
                return console.debug;
            case 1:
                return console.info;
            case 2:
                return console.warn;
            case 3:
            case 4:
                return console.error;
            default:
                return console.log;
        }
    }
    // Public logging methods
    debug(message, context, data) {
        this.outputLog(this.formatMessage(0, message, context, undefined, data));
    }
    info(message, context, data) {
        this.outputLog(this.formatMessage(1, message, context, undefined, data));
    }
    warn(message, context, data) {
        this.outputLog(this.formatMessage(2, message, context, undefined, data));
    }
    error(message, error, context, data) {
        this.outputLog(this.formatMessage(3, message, context, error, data));
    }
    fatal(message, error, context, data) {
        this.outputLog(this.formatMessage(4, message, context, error, data));
    }
    // Convenience methods for common logging patterns
    logApiRequest(method, url, requestId, data) {
        this.info(`API Request: ${method} ${url}`, {
            requestId,
            action: 'api_request'
        }, data);
    }
    logApiResponse(status, url, requestId, data) {
        this.info(`API Response: ${status} ${url}`, {
            requestId,
            action: 'api_response'
        }, data);
    }
    logApiError(status, url, requestId, error, data) {
        this.error(`API Error: ${status} ${url}`, error, {
            requestId,
            action: 'api_error'
        }, data);
    }
    logAuthEvent(event, userId, data) {
        this.info(`Auth Event: ${event}`, {
            userId,
            action: 'auth_event'
        }, data);
    }
    logUserAction(action, userId, data) {
        this.info(`User Action: ${action}`, {
            userId,
            action: 'user_action'
        }, data);
    }
    logSecurityEvent(event, userId, data) {
        this.warn(`Security Event: ${event}`, {
            userId,
            action: 'security_event'
        }, data);
    }
    // Performance logging
    logPerformance(operation, duration, context) {
        this.info(`Performance: ${operation} took ${duration}ms`, context, {
            duration,
            operation
        });
    }
    // Error boundary logging
    logErrorBoundary(error, errorInfo, context) {
        this.error('React Error Boundary caught error', error, context, {
            errorInfo
        });
    }
    // Set log level dynamically
    setLogLevel(level) {
        this.logLevel = level;
    }
    // Get current log level
    getLogLevel() {
        return this.logLevel;
    }
    // Check if a level is enabled
    isLevelEnabled(level) {
        return this.shouldLog(level);
    }
}
const logger = Logger.getInstance();
const log = {
    debug: (message, context, data)=>logger.debug(message, context, data),
    info: (message, context, data)=>logger.info(message, context, data),
    warn: (message, context, data)=>logger.warn(message, context, data),
    error: (message, error, context, data)=>logger.error(message, error, context, data),
    fatal: (message, error, context, data)=>logger.fatal(message, error, context, data),
    // Convenience methods
    api: {
        request: (method, url, requestId, data)=>logger.logApiRequest(method, url, requestId, data),
        response: (status, url, requestId, data)=>logger.logApiResponse(status, url, requestId, data),
        error: (status, url, requestId, error, data)=>logger.logApiError(status, url, requestId, error, data)
    },
    auth: (event, userId, data)=>logger.logAuthEvent(event, userId, data),
    user: (action, userId, data)=>logger.logUserAction(action, userId, data),
    security: (event, userId, data)=>logger.logSecurityEvent(event, userId, data),
    performance: (operation, duration, context)=>logger.logPerformance(operation, duration, context),
    errorBoundary: (error, errorInfo, context)=>logger.logErrorBoundary(error, errorInfo, context)
};
}}),
"[project]/lib/api/client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApiClient": (()=>ApiClient),
    "ApiClientError": (()=>ApiClientError),
    "apiClient": (()=>apiClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/logger.ts [app-ssr] (ecmascript)");
;
;
// Environment configuration with validation
const getApiConfig = ()=>{
    const baseURL = ("TURBOPACK compile-time value", "http://192.168.2.43:8000/api/v2");
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return {
        baseURL,
        timeout: parseInt(("TURBOPACK compile-time value", "30000") || "30000"),
        retries: parseInt(("TURBOPACK compile-time value", "3") || "3"),
        retryDelay: parseInt(("TURBOPACK compile-time value", "1000") || "1000")
    };
};
// Refresh endpoint path (joined with baseURL by axios)
const REFRESH_ENDPOINT_PATH = "/auth/token/refresh";
class ApiClientError extends Error {
    code;
    status;
    details;
    requestId;
    constructor(message, code, status, details, requestId){
        super(message);
        this.name = "ApiClientError";
        this.code = code;
        this.status = status;
        this.details = details;
        this.requestId = requestId;
    }
}
class ApiClient {
    client;
    defaultConfig;
    isRefreshing = false;
    failedQueue = [];
    constructor(config = {}){
        const apiConfig = getApiConfig();
        this.defaultConfig = {
            timeout: apiConfig.timeout,
            retries: apiConfig.retries,
            retryDelay: apiConfig.retryDelay,
            ...config
        };
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: apiConfig.baseURL,
            timeout: this.defaultConfig.timeout,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Client-Version": process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
                "X-Client-Platform": "web",
                "X-Requested-With": "XMLHttpRequest",
                ...this.defaultConfig.headers
            },
            withCredentials: true
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(this.requestInterceptor, this.requestErrorInterceptor);
        // Response interceptor
        this.client.interceptors.response.use(this.responseInterceptor, this.responseErrorInterceptor);
    }
    requestInterceptor = (config)=>{
        // Add request ID for tracing
        const requestId = this.generateRequestId();
        config.headers = config.headers || {};
        config.headers["X-Request-ID"] = requestId;
        // Add timestamp
        config.headers["X-Request-Timestamp"] = new Date().toISOString();
        // Determine if this is a public route that doesn't need authentication
        const isPublicRoute = this.isPublicRoute(config.url);
        const isRefreshRequest = this.isRefreshUrl(config.url);
        // Only attach access token for authenticated routes
        if (!isPublicRoute) {
            const accessToken = this.getAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        // For refresh requests, also attach refresh token in X-Refresh-Token header
        if (isRefreshRequest) {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
                config.headers["X-Refresh-Token"] = refreshToken;
            }
        }
        // Add CSRF token if available
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
            config.headers["X-CSRF-Token"] = csrfToken;
        }
        // Log request using structured logging (sanitize sensitive data)
        const sanitizedHeaders = {
            ...config.headers
        };
        if (sanitizedHeaders.Authorization) {
            sanitizedHeaders.Authorization = 'Bearer ***';
        }
        if (sanitizedHeaders['X-Refresh-Token']) {
            sanitizedHeaders['X-Refresh-Token'] = '***';
        }
        // Sanitize request data for logging (especially for login requests)
        let sanitizedData = config.data;
        if (config.url?.includes('/auth/login') && config.data) {
            sanitizedData = {
                email: '***',
                password: '***'
            };
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].api.request(config.method?.toUpperCase() || 'UNKNOWN', config.url || 'unknown', requestId, {
            headers: sanitizedHeaders,
            data: sanitizedData
        });
        return config;
    };
    requestErrorInterceptor = (error)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('API Request Error', error, {
            action: 'api_request_error'
        });
        return Promise.reject(error);
    };
    responseInterceptor = (response)=>{
        return response;
    };
    responseErrorInterceptor = async (error)=>{
        const originalRequest = error.config;
        // Handle network errors
        if (!error.response) {
            const networkError = new ApiClientError("Network error occurred. Please check your internet connection.", "NETWORK_ERROR", undefined, {
                originalError: error.message
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Network Error', networkError, {
                action: 'network_error'
            });
            throw networkError;
        }
        const { status, data } = error.response;
        const requestId = originalRequest?.headers?.["X-Request-ID"];
        // Handle authentication errors (401/403) with token refresh
        if (status === 401 || status === 403) {
            if (originalRequest && !originalRequest._retry && !this.isRefreshUrl(originalRequest.url)) {
                originalRequest._retry = true;
                try {
                    // Try to refresh the token (sends both access and refresh tokens via headers)
                    const newToken = await this.refreshAuthToken();
                    if (newToken) {
                        // Update the original request with new token
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        // Retry the original request
                        return this.client.request(originalRequest);
                    }
                } catch (refreshError) {
                    // Token refresh failed, redirect to login
                    this.handleAuthFailure();
                    const authError = new ApiClientError("Authentication failed. Please log in again.", "AUTH_FAILED", status, {
                        originalError: error.message
                    }, requestId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Authentication Failed', authError, {
                        action: 'auth_failed',
                        requestId,
                        status
                    });
                    throw authError;
                }
            }
        }
        // Handle retry logic for specific status codes
        if (this.shouldRetry(status) && this.canRetry(originalRequest)) {
            return this.retryRequest(originalRequest);
        }
        // Parse error response
        const apiError = this.parseErrorResponse(data, status, requestId);
        // Log error using structured logging
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].api.error(status, originalRequest?.url || 'unknown', requestId || 'unknown', apiError, data);
        throw apiError;
    };
    shouldRetry(status) {
        // Retry on server errors and rate limiting
        return status >= 500 || status === 429;
    }
    canRetry(config) {
        if (!config) return false;
        const retryCount = config._retryCount || 0;
        const maxRetries = this.defaultConfig.retries || 0;
        return retryCount < maxRetries;
    }
    async retryRequest(config) {
        config._retry = true;
        config._retryCount = (config._retryCount || 0) + 1;
        // Exponential backoff
        const delay = (this.defaultConfig.retryDelay || 1000) * Math.pow(2, config._retryCount - 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info(`Retrying request (attempt ${config._retryCount})`, {
            requestId: config.headers?.["X-Request-ID"],
            delay,
            url: config.url
        });
        await this.sleep(delay);
        return this.client.request(config);
    }
    parseErrorResponse(data, status, requestId) {
        // Handle structured API error response
        if (data && typeof data === "object" && data.error) {
            return new ApiClientError(data?.message || "An error occurred", data.error.code || "UNKNOWN_ERROR", status, data.error.details, requestId);
        }
        // Handle generic error responses
        const errorMessages = {
            400: "Bad request. Please check your input.",
            401: "Authentication required. Please log in.",
            403: "Access denied. You do not have permission to perform this action.",
            404: "The requested resource was not found.",
            409: "Conflict. The resource already exists or is in use.",
            422: "Validation error. Please check your input.",
            429: "Too many requests. Please try again later.",
            500: "Internal server error. Please try again later.",
            502: "Bad gateway. The server is temporarily unavailable.",
            503: "Service unavailable. Please try again later.",
            504: "Gateway timeout. The request took too long to process."
        };
        const message = errorMessages[status] || "An unexpected error occurred";
        const code = `HTTP_${status}`;
        return new ApiClientError(message, code, status, {
            originalData: data
        }, requestId);
    }
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    // CSRF token management
    getCsrfToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
        // Get CSRF token from meta tag or cookie
        const metaTag = undefined;
        // Fallback to cookie
        const token = undefined;
    }
    // Access and refresh token helpers (client-side fallback)
    getAccessToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
        const token = undefined;
    }
    getRefreshToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
        const token = undefined;
    }
    isRefreshUrl(url) {
        if (!url) return false;
        try {
            // Axios may pass relative URLs ("/auth/token/refresh") or full URLs
            return url.endsWith(REFRESH_ENDPOINT_PATH) || new URL(url, window.location.origin).pathname.endsWith(REFRESH_ENDPOINT_PATH);
        } catch  {
            return url.endsWith(REFRESH_ENDPOINT_PATH);
        }
    }
    isPublicRoute(url) {
        if (!url) return false;
        const publicRoutes = [
            '/auth/login',
            '/auth/register',
            '/auth/forgot-password',
            '/auth/reset-password',
            '/health',
            '/api/health'
        ];
        try {
            // Check if URL matches any public route
            const pathname = url.startsWith('http') ? new URL(url).pathname : url;
            return publicRoutes.some((route)=>pathname.startsWith(route));
        } catch  {
            // Fallback to simple string matching
            return publicRoutes.some((route)=>url.startsWith(route));
        }
    }
    async refreshAuthToken() {
        if (this.isRefreshing) {
            // If already refreshing, wait for it to complete
            return new Promise((resolve, reject)=>{
                this.failedQueue.push({
                    resolve,
                    reject
                });
            });
        }
        this.isRefreshing = true;
        try {
            const accessToken = this.getAccessToken();
            const refreshToken = this.getRefreshToken();
            if (!accessToken || !refreshToken) {
                throw new Error("Missing tokens for refresh");
            }
            // Import auth service dynamically to avoid circular dependency
            const { authService } = await __turbopack_context__.r("[project]/lib/services/auth.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
            // The interceptor will attach Authorization and X-Refresh-Token headers
            await authService.refreshToken({
                token: accessToken
            });
            const newAccessToken = this.getAccessToken();
            // Process queued requests
            this.failedQueue.forEach(({ resolve })=>{
                resolve(newAccessToken);
            });
            this.failedQueue = [];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('Token refreshed successfully', {
                action: 'token_refresh_success'
            });
            return newAccessToken;
        } catch (error) {
            // Process queued requests with error
            this.failedQueue.forEach(({ reject })=>{
                reject(error);
            });
            this.failedQueue = [];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Token refresh failed', error, {
                action: 'token_refresh_failed'
            });
            throw error;
        } finally{
            this.isRefreshing = false;
        }
    }
    handleAuthFailure() {
        // Clear token and redirect to login
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        // Redirect to login page
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login"
        // }
        }
    }
    // Public API methods
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    async put(url, data, config) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }
    async patch(url, data, config) {
        const response = await this.client.patch(url, data, config);
        return response.data;
    }
    async delete(url, config) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
    // File upload method
    async uploadFile(url, file, onUploadProgress, config) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await this.client.post(url, formData, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers
            },
            onUploadProgress
        });
        return response.data;
    }
    // Health check method
    async healthCheck() {
        try {
            await this.get("/health");
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('Health check passed', {
                action: 'health_check_success'
            });
            return true;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Health check failed', error, {
                action: 'health_check_failed'
            });
            return false;
        }
    }
}
const apiClient = new ApiClient();
;
}}),
"[project]/lib/services/auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authService": (()=>authService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/logger.ts [app-ssr] (ecmascript)");
;
;
class AuthService {
    static instance;
    constructor(){}
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    endPoints() {
        return {
            LOGIN: "/auth/login",
            LOGOUT: "/auth/logout",
            REFRESH_TOKEN: "/auth/token/refresh"
        };
    }
    async login(credentials) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(this.endPoints().LOGIN, credentials);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message || "Login failed");
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info("Login successful", {
                userId: data.user?.id,
                action: 'login_success'
            });
            this.setAuthUser(data.user);
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            return data;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error("Login service error", error, {
                action: 'login_error'
            });
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Network error occurred");
        }
    }
    async logout() {
        try {
            const user = this.getAuthUser();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(this.endPoints().LOGOUT);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].auth('User logout successful', user?.id);
            return response.data;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error("Logout error", error, {
                action: 'logout_error'
            });
        } finally{
            this.clearAuthData();
        }
    }
    async refreshToken({ token }) {
        try {
            if (!token) throw new Error("Token is required");
            const userId = this.getAuthUser()?.id;
            if (!userId) throw new Error("User ID is required");
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(this.endPoints().REFRESH_TOKEN);
            const { data: { token: newToken, status } } = response;
            if (!status) throw new Error("Authentication error, login again");
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].auth('Token refresh successful', userId);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error("Refresh token error", error, {
                action: 'token_refresh_error'
            });
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Network error occurred");
        }
    }
    // Development fallback token storage - REMOVE IN PRODUCTION
    setRefreshTokenFallback(token) {
        if (!isDevelopment()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warn("Client-side token storage should not be used in production", {
                action: 'security_warning'
            });
            return;
        }
        "TURBOPACK unreachable";
    }
    setAccessTokenFallback(token) {
        if (!isDevelopment()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warn("Client-side token storage should not be used in production", {
                action: 'security_warning'
            });
            return;
        }
        "TURBOPACK unreachable";
    }
    setAuthUser(user) {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }
    getAuthUser() {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return null;
    }
    clearAuthData() {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }
    getStoredToken() {
        if (!isDevelopment()) {
            return null;
        }
        "TURBOPACK unreachable";
        const token = undefined;
    }
    isTokenExpired(token) {
        try {
            if (!token || typeof token !== 'string') {
                return true;
            }
            const parts = token.split('.');
            if (parts.length !== 3) {
                return true;
            }
            const payload = JSON.parse(atob(parts[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            // Check if token has expiration
            if (!payload.exp || typeof payload.exp !== 'number') {
                return true;
            }
            // Add 5 minute buffer for refresh
            return payload.exp < currentTime + 300;
        } catch (error) {
            if (isDevelopment()) {
                "TURBOPACK unreachable";
            }
            return true // If we can't parse the token, consider it expired
            ;
        }
    }
    // Get token expiration time with validation
    getTokenExpiration(token) {
        try {
            if (!token || typeof token !== 'string') {
                return null;
            }
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
            }
            const payload = JSON.parse(atob(parts[1]));
            if (!payload.exp || typeof payload.exp !== 'number') {
                return null;
            }
            return new Date(payload.exp * 1000);
        } catch (error) {
            if (isDevelopment()) {
                "TURBOPACK unreachable";
            }
            return null;
        }
    }
    // Validate token structure
    isValidTokenFormat(token) {
        try {
            if (!token || typeof token !== 'string') {
                return false;
            }
            const parts = token.split('.');
            if (parts.length !== 3) {
                return false;
            }
            // Basic format validation
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            return header.alg && payload.exp && payload.iat;
        } catch  {
            return false;
        }
    }
}
// Development mode check
function isDevelopment() {
    return "undefined" !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes("localhost") || window.location.hostname.includes("192.168.2.43")) // TODO: remove for production
    ;
}
const authService = AuthService.getInstance();
}}),
"[project]/lib/types/auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ROLE_ROUTES": (()=>ROLE_ROUTES)
});
const ROLE_ROUTES = {
    "801": "/admin/dashboard",
    "802": "/superadmin/dashboard",
    "800": "/superadmin/dashboard",
    "803": "/teacher/dashboard",
    "805": "/parent/dashboard",
    "804": "/student/dashboard",
    "807": "/bursar/dashboard"
};
}}),
"[project]/lib/contexts/AuthContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/logger.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [permissions, setPermissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const isAuthenticated = !!token && !!user;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for stored token on mount
        const initializeAuth = async ()=>{
            try {
                const storedToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
                const newUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getAuthUser();
                if (storedToken && newUser) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].isTokenExpired(storedToken)) {
                        try {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].refreshToken({
                                token: storedToken
                            });
                            const newToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
                            if (newToken) {
                                setToken(newToken);
                                setUser(newUser);
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].auth('Auth initialized with refreshed token', newUser.id);
                            } else {
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].clearAuthData();
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warn('Token refresh failed during initialization', {
                                    action: 'init_token_refresh_failed'
                                });
                            }
                        } catch (refreshError) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].clearAuthData();
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Token refresh failed during initialization', refreshError, {
                                action: 'init_token_refresh_error'
                            });
                        }
                    } else {
                        setToken(storedToken);
                        setUser(newUser);
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].auth('Auth initialized with existing token', newUser.id);
                    }
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Auth initialization error', error, {
                    action: 'auth_init_error'
                });
            } finally{
                setIsLoading(false);
            }
        };
        initializeAuth();
    }, []);
    // Set up token refresh interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!token) return;
        const refreshInterval = setInterval(async ()=>{
            try {
                const currentToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
                if (currentToken && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].isTokenExpired(currentToken)) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].refreshToken({
                        token: currentToken
                    });
                    const newToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
                    if (newToken) {
                        setToken(newToken);
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('Auto token refresh successful', {
                            action: 'auto_token_refresh_success'
                        });
                    }
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Auto token refresh failed', error, {
                    action: 'auto_token_refresh_failed'
                });
                setIsLoading(false);
                await logout();
            }
        }, 5 * 60 * 1000) // Check every 5 minutes
        ;
        return ()=>clearInterval(refreshInterval);
    }, [
        token
    ]);
    const login = async (credentials)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
            console.log('This is the new login response', response);
            const { user, accessToken: userToken, permissions: userPermissions } = response;
            setUser(user);
            setToken(userToken);
            setPermissions(userPermissions);
            if (user.firstTimeLogin) {
                router.replace("/onboarding");
            } else {
                const roleId = user.roleId;
                const redirectPath = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_ROUTES"][roleId];
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].user('Redirecting to role dashboard', user.id, {
                    action: 'redirect_dashboard',
                    roleId,
                    redirectPath
                });
                router.replace(redirectPath);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Login failed";
            setError(errorMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Login failed in context', error, {
                action: 'context_login_error'
            });
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const logout = async ()=>{
        try {
            if (token) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Logout error in context', error, {
                action: 'context_logout_error'
            });
        } finally{
            setUser(null);
            setToken(null);
            setPermissions([]);
            setError(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].clearAuthData();
            router.replace("/login");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: "Logged Out",
                description: "You have been successfully logged out.",
                variant: "default"
            });
        }
    };
    const refreshAuth = async ()=>{
        try {
            const currentToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
            if (currentToken) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].refreshToken({
                    token: currentToken
                });
                const newToken = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getStoredToken();
                if (newToken) {
                    setToken(newToken);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('Manual token refresh successful', {
                        action: 'manual_token_refresh_success'
                    });
                }
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Manual token refresh failed', error, {
                action: 'manual_token_refresh_failed'
            });
            await logout();
        }
    };
    const value = {
        user,
        token,
        permissions,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        refreshAuth
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/contexts/AuthContext.tsx",
        lineNumber: 180,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1025c5ac._.js.map