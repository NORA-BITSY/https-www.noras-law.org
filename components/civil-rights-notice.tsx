'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { X, AlertTriangle, Shield } from 'lucide-react'

export function CivilRightsNotice() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100">
          <Shield className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex-1">
              <strong>Civil Rights Notice:</strong> This platform is dedicated to defending constitutional rights in family court proceedings.
              All information provided is for educational purposes and does not constitute legal advice.
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="ml-4 h-6 w-6 p-0 hover:bg-amber-100 dark:hover:bg-amber-900/30"
            >
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    </AnimatePresence>
  )
}
