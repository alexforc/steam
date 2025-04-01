
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Loader2, ArrowLeft } from "lucide-react";

interface ResetPasswordFormProps {
  onBackToLoginClick: () => void;
}

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordForm({ onBackToLoginClick }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetValues) => {
    setIsLoading(true);
    try {
      const success = await resetPassword(data.email);
      if (success) {
        setIsSubmitted(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent password reset instructions to your email address.
        </p>
        <Button onClick={onBackToLoginClick} className="mx-auto">
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button
          type="button"
          variant="ghost"
          className="px-0 mb-2"
          onClick={onBackToLoginClick}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Button>

        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
        
        <p className="text-gray-600 text-sm mb-4">
          Enter your email address and we'll send you instructions on how to reset your password.
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="your@email.com"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Instructions"
          )}
        </Button>
      </form>
    </Form>
  );
}
