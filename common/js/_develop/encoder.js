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
      // 清除 Input 和 Output 的內容
      clearHandler() {
        this.textInput = '';
        this.textOutput = '';
      },
      // 送出內容（編碼或解碼）
      submitHandler() {
        if (typeof this.textInput !== 'string') {
          return false;
        } else {
          this.textOutput = this.computedCode();
        }
      },
      // 判斷目前是編碼或解碼，並回傳對應的編解碼值
      computedCode() {
        if (this.encode_selected === true) {
          return this.encodeHandler(this.textInput);
        } else {
          return this.decodeHandler(this.textInput);
        }
      },
      // * 編碼
      encodeHandler(payload) {
        // 把字串轉成陣列
        const strArray = payload.split('');
        const resultArray = strArray.map(item => {

          // 把明文轉成 unicode
          let unicode = `${item.charCodeAt(0)}`;
          let unicodeArray = unicode.split('');

          // 將 unicode 代碼補 0（5位數）
          let sup = 0 - (unicodeArray.length - (this.process.digits - 2));

          for (let i = 0; i < sup; i++) {
            unicodeArray.unshift('0');
          }

          // 隨機取得兩個質數相乘，使用凱薩密碼編碼
          const keyData = this.getRandomPrimeNumber();
          const cipherCode = this.encodeCaesarCipher(unicodeArray, keyData.key);

          let codeArray = cipherCode.split('');

          // 把兩個質數的 index 放在密文的第一個與最後一個
          codeArray.unshift(keyData.prime[0]);
          codeArray.push(keyData.prime[1]);

          return codeArray.join('');
        });

        return resultArray.join('');
      },
      // * 解碼
      decodeHandler(payload) {
        // 判斷傳入值是否為數字
        let isError = parseInt(payload) ? false : true;

        if (isError === true) {
          return 'error';
        }

        // 把所有密文以每 7 個字串組成陣列
        const strArray = payload.split('');
        const codeArray = [];

        for (let i = 0; i < strArray.length; i += this.process.digits) {
          codeArray.push(strArray.slice(i, i + this.process.digits).join(''));
        }

        // 處理密文
        const resultArray = codeArray.map(item => {
          // 取得兩個質數的 index
          const keyIndex = [parseInt(item[0]), parseInt(item[this.process.digits - 1])];
          // 取得密文內容
          const cipherCode = item.slice(1, this.process.digits - 1);
          // 取得兩個質數相乘
          const key = this.process.prime[keyIndex[0]] * this.process.prime[keyIndex[1]];
          // 凱薩密碼解碼成 unicode
          const plainCode = this.decodeCaesarCipher(cipherCode, key);

          // 驗證是否為 unicode
          if (isError === false) {
            isError = !this.validateNumberValue(plainCode);
          }

          // unicode 轉回明文
          const plainText = String.fromCharCode(`${plainCode}`);

          return plainText;
        });

        const result = resultArray.join('').trim();

        if (result === '') {
          isError = true;
        }

        return isError === true ? 'error' : result;
      },
      // 回傳亂數
      getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      // 驗證是否為 Unicode 值
      validateNumberValue(payload) {
        return payload <= 65535 || payload >= 32 || payload === 10 ? true : false;
      },
      // 隨機取得2個質數
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
      // 凱薩密碼轉換（編碼）
      encodeCaesarCipher(payload, offset) {
        let resultArray = payload.map(item => (parseInt(item) + offset) % 10 );
        return resultArray.join('');
      },
      // 凱薩密碼轉換（解碼）
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