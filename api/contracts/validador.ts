declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    uniqueForeignKeyUser(related: string, relatedField: string): Rule,
  }
}
