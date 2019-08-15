import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as t from 'io-ts'

export function validateAgainstCodec(codec: t.Any, data: any) {
  const decodingResult = codec.decode(data)
  ThrowReporter.report(decodingResult)

  return true
}