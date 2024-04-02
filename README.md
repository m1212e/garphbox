# prisma-generator-garph
Generate versatile garph schemes from your prisma schema.

> This is still under development, expect bugs and breaks!

> Currently does not support mongoDB composite types (https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-composite-types)

Install it in your project,
```bash
npm i -D prisma-generator-garph
pnpm i -D prisma-generator-garph
bun i -D prisma-generator-garph
```

 then add
```prisma
generator garph {
  provider = "prisma-generator-garph"
  // you can optionally specify the output location. Defaults to ./garph
  output = "./myCoolGarphDirectory"
  // if you want, you can customize the imported variable name that is used for the schemes. Defaults to "g" which is what the standard garph package offers
  typeboxImportVariableName = "t"
  // you also can specify the dependency from which the above import should happen. This is useful if a package re-exports the typebox package and you would like to use that
  typeboxImportDependencyName = "garph"
}
```
to your `prisma.schema`. You can modify the settings to your liking, please see the respective comments for info on what the option does.

## Annotations
prisma-generator-garph offers annotations to adjust the output of models and fields.

| Annotation | Example | Description |
---|---|---
| @garph.hide | - | Hides the field or model from the output |
| @garph.hidden | - | Alias for @garph.hide |

A schema using annotations could look like this:
```prisma
/// The post model
model Post {
  id        Int      @id @default(autoincrement())
  /// @garph.hidden
  createdAt DateTime @default(now())
  title     String   @unique

  User   User? @relation(fields: [userId], references: [id])
  /// this is the user id
  userId Int?
}

/// @garph.hidden
enum Account {
  PASSKEY
  PASSWORD
}

```
> Please note that you cannot use multiple annotations in one line! Each needs to be in its own!
