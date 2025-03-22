"use client";

// Importing built-in dependencies
import { getSession, SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @next/next/no-async-client-component
const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
          router.replace('/api/auth/signin')
        },
      })
    
      if (status === "loading") {
        return "Loading or not authenticated..."
      }
    

    return (
        <>{children}</>
    )
}

export default ProtectedPage;