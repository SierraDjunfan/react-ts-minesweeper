export function fillFromZeroToN(n: number) {
    return Array(n + 1).fill(0).map((_, i) => i)
  }