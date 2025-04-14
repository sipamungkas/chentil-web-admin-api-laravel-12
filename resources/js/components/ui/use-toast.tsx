import { Toast } from "@/components/ui/toast"
import {
  useToast as useToastShadcn,
  type ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast"

export type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

export function useToast() {
  const { toast } = useToastShadcn()

  return {
    toast: ({ ...props }: Omit<ToasterToast, "id">) => toast(props),
    dismiss: (toastId?: string) => toast.dismiss(toastId),
  }
} 