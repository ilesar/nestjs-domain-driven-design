export default interface JsonInterface {
  [x: string]:
    | string
    | number
    | boolean
    | null
    | JsonInterface[]
    | { [key: string]: JsonInterface };
}
