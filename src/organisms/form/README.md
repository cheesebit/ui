# `use-form`

This is a custom hook to provide an easier way to manage form state in React.

# Props

## values: object

This prop serves a single purpose that is provide the initia values for the
fields in your form.

## schema?: object

With this object you will establish validation rules to be applied to the fields
in your form.

The names of your fields will act as keys and the value - a `string`, `array` or
`object` containing the rules to be applied on that field value
(`<fieldName>: <string>|<array>|<object>`).

The rules can be written as follows:

### - string

Here you will use a predefined validator.

This hooks comes wired with a series of validators and you can apply any of them
just providing its name.

Important to notice that you should a string typed rule whenever you validation
_does not_ required any additional arguments.

**Example**

```js
const schema = {{
  name: [
    'required'
  ]
}}
```

Currently we support the following predefined validators:

#### `permissive`

This is a fallback validator that returns `true` (which means 'valid') always.

#### `required`

This validator returns `true` if the field's value is nor `null` neither
`undefined`.

#### `string.blank`

This validator returns `true` if a trimmed version of the given string is not
empty (`null` or `undefined` included).

#### `string.empty`

Same as `string.blank`, except it does not check for `null` or `undefined`.

### - array

Here you will use a predefined validator with additional arguments.

**Example**

```js
const schema = {{
  name: [
    'required',
    ['string.length.range', 3, 15]
  ]
}}
```

Currently we support the following predefined validators:

#### `number.max`

Checks if the field value is less than or equals to the provided argument.

**Example**

```js
const schema = {{
  age: [
    ['number.max', 21]
  ]
}}
```

#### `number.min`

Checks if the field value is greater than or equals to the provided argument.

**Example**

```js
const schema = {{
  age: [
    ['number.min', 18]
  ]
}}
```

#### `number.range`

Checks if the field value is between the min/max range (inclusive).

**Example**

```js
const schema = {{
  age: [
    ['number.range', 18, 21]
  ]
}}
```

#### `string.length.max`

Checks if the string field value has length less than or equals to the provided
argument.

**Example**

```js
const schema = {{
  name: [
    ['string.length.max', 255]
  ]
}}
```

#### `string.length.min`

Checks if the string field value has length greater than or equals to the
provided argument.

**Example**

```js
const schema = {{
  name: [
    ['string.length.max', 255]
  ]
}}
```

#### `string.length.range`

Checks if the string field value has length between the min/max arguments.

**Example**

```js
const schema = {{
  name: [
    ['string.length.range', 3, 255]
  ]
}}
```

#### `string.length`

Checks if the string field value has length equals to the provided arguments.

**Example**

```js
const schema = {{
  name: [
    ['string.length.range', 3, 255]
  ]
}}
```

### - object

Allows you to write your own validator or to use additional options for a
predefined validator.

You can include the following options:

- `validator` - function or promise that will perform your custom validation;
  the first parameter it will receive is the `values` object, which contains the
  current values for your fields, followed by any additional arguments you
  provide using `args`;
- `args` - Aditional arguments to be provided to your `validator`;
- `except`- function or promise that you can use to dinamycally prevent your
  custom validation from being run;
- `name` - This is name for your custom validator, which will be used to
reference any error it returns. **If you use the name of an existing predefined
validator, your customized one will be mercilessly overriden**.
<!-- - on, -->

**Example**

```js
const myWeirdArg = 18;
const schema = {{
  list: [
    {
      name: 'my-custom-validator',
      validator: function({ age, list }, myWeirdArg) {
        if (age > myWeirdArg) {
          return list.length > 0;
        }

        return true;
      },
      args: [myWeirdArg],
      except: function({ age }) {
        return age > 65;
      }
    }
  ],
  age: 'required',
  name: 'required'
}}
```
