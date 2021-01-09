import { registerAs } from '@nestjs/config'

export default registerAs('',() => ({
  port: process.env.APP_PORT || 3001,
}))
