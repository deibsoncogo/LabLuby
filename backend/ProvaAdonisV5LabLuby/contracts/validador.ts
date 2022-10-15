declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    stringArray(type?: string, minElement?: number, maxElement?: number, hasDouble?: boolean): Rule
    numberInteger(): Rule
  }
}
