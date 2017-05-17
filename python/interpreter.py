import random, time, datetime, math

def check():
  global accumulator, position
  global ifstage, testval, test
  global tempaccumulator, temppos
  global output
  
  if code[position] == "^":
      accumulator += 1
      position += 1

  elif code[position] == "v":
      accumulator -= 1
      position += 1

  elif code[position] == "a":
      output+=chr(accumulator)
      position += 1

  elif code[position] == "o":
      output+=str(accumulator)
      position += 1

  elif code[position] == "`":
    string = "";
    position += 1;
    while code[position] != "`":
      string += code[position];
      position += 1
    
    output += string;
    position += 1;

  elif code[position] == "r":
      accumulator = random.randint(0, accumulator)
      position += 1

  elif code[position] in "0123456789":
      try:
          n = ""
          while code[position] in "0123456789.":
              n += code[position]
              position += 1

          if "." in n:
            accumulator = float(n)
          else:
            accumulator = int(n)

      except IndexError:
          accumulator = int(n)

  elif code[position] == "~":
      if not code[position+1] in "(){}+-naor~*/%I<>=^v":
          variables[code[position+1]] = accumulator
          position += 2
      else:
          raise NameError(code[position+1] + " at " + str(position+1) + " is a reserved keyword")

  elif code[position] == "(":
      tempaccumulator += [accumulator]
      temppos += [position + 1]
      accumulator = 0
      position += 1

  elif code[position] == ")":
      if accumulator == tempaccumulator[len(tempaccumulator)-1]:
          position += 1
          del tempaccumulator[len(tempaccumulator)-1]
          del temppos[len(temppos)-1]
      else:
          position = temppos[len(temppos)-1]

  elif code[position] == "{":
      if ifstage == 1:
          testval = accumulator
          accumulator = 0
          position += 1
      elif ifstage == 2:
          if not test:
              try:
                  while code[position] != "}":
                      position += 1
                  accumulator = testval
              except IndexError:
                  pass
          else:
              position += 1


  elif code[position] == "}":
      if ifstage == 1:
          ifstage = 2
          if accumulator == testval:
              test = True
          else:
              test = False
          position += 1
      elif ifstage == 2:
          ifstage = 1
          testval = 0
          test = True
  
          position += 1
  
  elif code[position] == " ":
      position += 1

  elif code[position] == "*":
      position += 1
      multitempaccumulator = accumulator
      check()
      accumulator *= multitempaccumulator
      

  elif code[position] == "/":
      position += 1
      divtempaccumulator = accumulator
      check()
      accumulator = divtempaccumulator//accumulator

  elif code[position] == "%":
      position += 1
      modtempaccumulator = accumulator
      check()
      accumulator = modtempaccumulator % accumulator

  elif code[position] == "+":
      position += 1
      addtempaccumulator = accumulator
      check()
      accumulator += addtempaccumulator

  elif code[position] == "-":
      position += 1
      subtempaccumulator = accumulator
      check()
      accumulator = subtempaccumulator - accumulator

  elif code[position] == "P":
      position += 1
      powtempaccumulator = accumulator
      check()
      accumulator = int(powtempaccumulator ** accumulator)

  elif code[position] == "L":
      log = math.log10(accumulator)
      accumulator = int(log)
      position += 1
      
  elif code[position] == "I":
      stdin = input()
      if stdin != "":
          try:
              stdin = int(stdin)
          except ValueError:
              stdin = ord(stdin)
          accumulator = stdin
      position += 1

  elif code[position] == ">":
      position += 1
      gttempaccumulator = accumulator
      check()
      if gttempaccumulator > accumulator:
          accumulator = 1
      else:
          accumulator = 0

  elif code[position] == "<":
      position += 1
      lttempaccumulator = accumulator
      check()
      if lttempaccumulator < accumulator:
          accumulator = 1
      else:
          accumulator = 0

  elif code[position] == "=":
      position += 1
      eqtempaccumulator = accumulator
      check()
      if eqtempaccumulator == accumulator:
          accumulator = 1
      else:
          accumulator = 0

  elif code[position] == ";":
      time.sleep(accumulator)
      position += 1
      
  elif code[position] == "@":
      output = ""
      position += 1
      
  elif code[position] == "d":
      times = datetime.datetime.now().time()
      date = datetime.datetime.now().date()
      
      dateArr = [times.second, times.minute, times.hour, date.day, date.month, date.year]

      accumulator = dateArr[accumulator]
      position += 1

  else:
      if code[position] in variables:
          accumulator = variables[code[position]]
          position += 1
      else:
          variables[code[position]] = 0
          accumulator = 0
          position += 1

code = input()

position = 0

accumulator = 0

ifstage = 1
testval = 0
test = True

tempaccumulator = []
temppos = []

variables = {}

output = ""

try:
  while True:
      check()

except IndexError:
  print(output)
