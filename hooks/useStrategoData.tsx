"use client"
import { StrategoContext } from "@/components/stratego-context"
import { useContext } from "react"

export default function useStrategoData() {
  const context = useContext(StrategoContext)
  if (!context) {
    throw new Error(
      "useStrategoData must be used within a StrategoContextProvider"
    )
  }
  return context
}
