declare module '@ioc:Adonis/Addons/Mail' {
  import { MailDrivers } from '@ioc:Adonis/Addons/Mail'

  interface MailersList {
    mailgun: MailDrivers['mailgun']
  }
}
