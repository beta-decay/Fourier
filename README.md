# Fourier
**Fourier** is a golfing language with a very obfuscated syntax. It is still undergoing development as of May 2017.

Syntax
------

### Repeat

`x()`

Repeat the code within the brackets until the accumulator equals the value of the accumulator at `x`. After the open bracket, the accumulator is set to 0. Repeats *can* be nested.

### If

`x{a}{b}`

If the result of `a` equals the value of the accumulator at `x` then run code `b`. After the open curly bracket, the accumulator is set to 0. Ifs *cannot* be nested.

### Increase

`^`

Increase the accumulator by one.

### Decrease

`v`

Decrease the accumulator by one.

### Number

`n`

Set the accumulator to the integer `n`.

### Character out

`a`

Takes the value of the accumulator as the ASCII code and outputs the character.

### Number out

`o`

Outputs the value of the accumulator.

### Print string

`` `x` ``

Prints the string between the backticks, e.g. `` `Hello, World!` `` outputs `Hello, World!`.

### Random

`r`

Sets the accumulator to a random value in the range 0 to the value of the accumulator.

### Set variable

`~z`

Creates a variable `z` and sets it to value of the accumulator.

### Call variable

`z`

Sets the accumulator to the value of variable `z`. If not previously initialised, the variable is equal to 0.

### Add

`+x`

Sets the accumulator to the value of the accumulator plus the value of `x`.

### Subtract

`-x`

Sets the accumulator to the value of the accumulator minus the value of `x`.

### Multiply

`*x`

Sets the accumulator to the value of the accumulator multiplied by the value of `x`.

### Divide

`/x`

Sets the accumulator to the value of the accumulator divided by the value of `x`.

### Modulo

`%x`

Sets the accumulator to the remainder of the value of the accumulator divided by the value of `x`.

### Power

`Px`

Sets the accumulator to the value of the accumulator to the power of `x`.

### Log 10

`xL`

Sets the accumulator to the value of log 10 of the accumulator.

### Input

`I`

Sets the accumulator to the user input.

### Greater than

`>x`

Sets the accumulator to 1 if the value of the accumulator is greater than the value of `x`, 0 if not.

### Less than

<code><x</code>

Sets the accumulator to 1 if the value of the accumulator is less than the value of `x`, 0 if not.

### Equal to

`=x`

Sets the accumulator to 1 if the value of the accumulator is equal to the value of `x`, 0 if not.

### Date

`xd`

Sets the accumulator to parts of the date depending on the value of `x`:

#### 0d

Sets the accumulator to the seconds part of the current time.

#### 1d

Sets the accumulator to the minutes part of the current time.

#### 2d

Sets the accumulator to the hour part of the current time.

#### 3d

Sets the accumulator to the day part of the current date.

#### 4d

Sets the accumulator to the month part of the current date.

#### 5d

Sets the accumulator to the year part of the current date.

#### Other

If the date is any other number (apart from 0, 1, 2, 3, 4, or 5), the accumulator is set to the current UNIX timestamp.

### CLS

`@`

Clears the current output.

### Delay

`x;`

Starts a time delay of `x` seconds, during which, no code is executed.

Example
-------

### Ascii table

#### Code

    33~j126(j^a~j)

[**Try it online!**]

#### Output

     "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~

### Fibonacci sequence

#### Code

    1~yI~k(xoi^<k{1}{44a32a}y+x~gy~xg~yi^~i)

[**Try it online!**](http://fourier.tryitonline.net/#code=MX55SX5rKHhvaV48a3sxfXs0NGEzMmF9eSt4fmd5fnhnfnlpXn5pKQ&input=MzA)

#### Output

**For input `30`:**

    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229

### Digital Clock

#### Code

    (@2do58a1d~S<10{1}{0o}So58a0d~S<10{1}{0o}So1;)

#### Output

*This is just an example (output changes each second)*

    16:57:06

[**Try it online!**][1]

Interpreter
-----------

You can find two up to date online interpreters [here] and [here][2].

  [**Try it online!**]: http://fourier.tryitonline.net/#code=MzN-ajEyNihqXmF-aik
  [1]: https://beta-decay.github.io/editor?code=KEAyZG81OGExZH5TPDEwezF9ezBvfVNvNThhMGR-UzwxMHsxfXswb31TbzE7KQ
  [here]: http://beta-decay.github.io/editor
  [2]: http://fourier.tryitonline.net
