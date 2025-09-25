// Local: src/components/auth/ProtectedRoute.tsx

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e o usuário não estiver autenticado...
    if (!isLoading && !isAuthenticated) {
      // ...redireciona para a página de login.
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Enquanto estiver verificando a autenticação, pode mostrar um loading
  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de spinner
  }

  // Se estiver autenticado, mostra o conteúdo da página
  return isAuthenticated ? <>{children}</> : null;
}