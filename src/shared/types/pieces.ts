export enum Pieces {
  X = "X",
  O = "O",
  Empty = "",
}
// Normally we would use a const here, because the value actually matters.
// Here, we need 'pieces' available as a type, so the enum is fine.
