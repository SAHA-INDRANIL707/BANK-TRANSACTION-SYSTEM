---
title: Number Ticker
date: 2023-11-18
description: Animate numbers to count up or down to a target number
author: dillionverma
published: true
video: https://cdn.magicui.design/number-ticker.mp4
---

<ComponentPreview name="number-ticker-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @magicui/number-ticker
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

```tsx
"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  )
}

```

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

## Example

### Decimal

<ComponentPreview name="number-ticker-decimal-demo" />

### Start Value

<ComponentPreview name="number-ticker-demo-2" />

### Usage

```tsx showLineNumbers
import { NumberTicker } from "@/components/ui/number-ticker"
```

```tsx showLineNumbers
<NumberTicker value={100} />
```

## Props

| Prop            | Type         | Default | Description                          |
| --------------- | ------------ | ------- | ------------------------------------ |
| `value`         | `int`        | `0`     | The value to count to                |
| `direction`     | `up \| down` | `"up"`  | The direction to count in            |
| `delay`         | `number`     | `0`     | The delay before counting            |
| `decimalPlaces` | `number`     | `0`     | The number of decimal places to show |
| `startValue`    | `number`     | `0`     | The value to start counting from     |
