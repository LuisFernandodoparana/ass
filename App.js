import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator() {
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
      case '%':
        setCurrentNumber((fistNumber / 100).toString())
        return
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if (buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "%") {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch (buttonPressed) {
      case 'DEL':
        if(currentNumber.length<= 1){
          setCurrentNumber("")
        }else
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        if(currentNumber>0){
          setLastNumber("-"+ currentNumber)
        setCurrentNumber("-"+ currentNumber)
        }else{
        setLastNumber("")
        setCurrentNumber(Math.abs(currentNumber))
        }
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View>

        {/* Area onde os botões são exibidos*/}
        <View style={styles.buttons}>

          {buttons.map((button) =>
            button === '=' ? // Mapeamento do botão =
              <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '	#191970' }]}>
                <Text style={[styles.textButton, { color: "white", fontSize: 30 }]}>{button}</Text>
              </TouchableOpacity>
              : // Mapeamento dos outros botões
              <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
                <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'white' : '#0093a6' }]}>{button}</Text>
              </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "	#191970"
  },
  resultText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText: {
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#0000CD',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  }
});