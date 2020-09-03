(function (Vue) {

  const app = {
    template: `
      <div class="main">
          <div class="select__control">
              <div class="select__fieldset">
                  <input type="radio" name="select-control" id="encode" v-model="encode_selected" @change="clearHandler" :value="true">
                  <label for="encode" title="Encode">Encode<span></span></label>
              </div>
              <div class="select__fieldset">
                  <input type="radio" name="select-control" id="decode" v-model="encode_selected" @change="clearHandler" :value="false">
                  <label for="decode" title="Decode">Decode<span></span></label>
              </div>
          </div>

          <div class="article">
              <label class="caption" for="input-area">Input :</label>
              <textarea id="input-area" class="textarea" :placeholder="inputAreaPlaceholder" v-model.trim="textInput"></textarea>
          </div>

          <div class="row">
              <button class="btn" @click.stop="submitHandler" title="Submit">Submit</button>
              <button class="btn" @click.stop="clearHandler" title="Clear">Clear</button>
          </div>

          <div class="article">
              <label class="caption" for="output-area">Output :</label>
              <div id="output-area" class="textarea" v-cloak>{{ textOutput }}</div>
          </div>
        </div>
      `,
    data() {
      return {
        textInput: '',
        textOutput: '',
        encode_selected: true,
        process: {
          digits: 7,
          prime: [53, 97, 59, 89, 61, 83, 67, 79, 71, 73]
        }
      };
    },
    methods: {
      clearHandler() {
        this.textInput = '';
        this.textOutput = '';
      },
      submitHandler() {
        if (typeof this.textInput !== 'string') {
          return false;
        } else {
          this.textOutput = this.computedCode();
        }
      },
      computedCode() {
        if (this.encode_selected === true) {
          return this.encodeHandler(this.textInput);
        } else {
          return this.decodeHandler(this.textInput);
        }
      },
      encodeHandler(payload) {
        const strArray = payload.split('');
        const resultArray = strArray.map(item => {
          let unicode = `${item.charCodeAt(0)}`;
          let unicodeArray = unicode.split('');
          let sup = 0 - (unicodeArray.length - (this.process.digits - 2));

          for (let i = 0; i < sup; i++) {
            unicodeArray.unshift('0');
          }

          const keyData = this.getRandomPrimeNumber();
          const cipherCode = this.encodeCaesarCipher(unicodeArray, keyData.key);

          let codeArray = cipherCode.split('');

          codeArray.unshift(keyData.prime[0]);
          codeArray.push(keyData.prime[1]);

          return codeArray.join('');
        });

        return resultArray.join('');
      },
      decodeHandler(payload) {
        let isError = parseInt(payload) ? false : true;

        if (isError === true) {
          return 'error';
        }

        const strArray = payload.split('');
        const codeArray = [];

        for (let i = 0; i < strArray.length; i += this.process.digits) {
          codeArray.push(strArray.slice(i, i + this.process.digits).join(''));
        }

        const resultArray = codeArray.map(item => {
          const keyIndex = [parseInt(item[0]), parseInt(item[this.process.digits - 1])];
          const cipherCode = item.slice(1, this.process.digits - 1);

          const key = this.process.prime[keyIndex[0]] * this.process.prime[keyIndex[1]];
          const plainCode = this.decodeCaesarCipher(cipherCode, key);

          if (isError === false) {
            isError = !this.validateNumberValue(plainCode);
          }

          const plainText = String.fromCharCode(`${plainCode}`);

          return plainText;
        });

        const result = resultArray.join('').trim();

        if (result === '') {
          isError = true;
        }

        return isError === true ? 'error' : result;
      },
      getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      validateNumberValue(payload) {
        return payload <= 65535 || payload >= 32 || payload === 10 ? true : false;
      },
      getRandomPrimeNumber() {
        let rendomValue = [this.getRandomArbitrary(0, 9), this.getRandomArbitrary(0, 9)];

        let primes = [
          this.process.prime[rendomValue[0]],
          this.process.prime[rendomValue[1]]
        ];

        const result = {
          key: primes[0] * primes[1],
          prime: rendomValue
        };

        return result;
      },
      encodeCaesarCipher(payload, offset) {
        let resultArray = payload.map(item => {
          let result = (parseInt(item) + offset) % 10;
          return result;
        });

        return resultArray.join('');
      },
      decodeCaesarCipher(payload, offset) {
        let stringArray = payload.split('');

        let resultArray = stringArray.map(item => {
          let result = null;

          for (let i = 0; i < 10; i++) {
            if (((i + offset) % 10) === parseInt(item)) {
              result = i;
              break;
            }
          }

          return result;
        });

        return resultArray.join('');
      }
    },
    computed: {
      inputAreaPlaceholder() {
        const textContent = {
          encode: 'Please enter the text for Encode.',
          decode: 'Please enter the text for Decode.'
        };

        return this.encode_selected === true ? textContent['encode'] : textContent['decode'];
      }
    }
  };

  const vm = new Vue({
    render: h => h(app)
  }).$mount('#app');

})(Vue);