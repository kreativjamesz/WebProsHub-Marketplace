/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Creates a debounced function that returns a promise and can be awaited.
 *
 * @param func The async function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced async function that returns a promise
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let resolvePromise: (value: Awaited<ReturnType<T>>) => void
  let rejectPromise: (reason?: any) => void

  return function debounced(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      resolvePromise = resolve
      rejectPromise = reject

      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args)
          resolvePromise(result)
        } catch (error) {
          rejectPromise(error)
        }
      }, wait)
    })
  }
}
