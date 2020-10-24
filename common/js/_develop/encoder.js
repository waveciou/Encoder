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
          <textarea id="input-area" class="textarea" :placeholder="inputAreaPlaceholder" v-model.trim="textInput" @keypress.enter="submitHandler"></textarea>
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
          digits: 5,
          prime: [ 53, 97, 59, 89, 61, 83, 67, 79, 71, 73 ]
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

        // 公用常數
        const publicConst = this.getRandomNumber(0, 9);

        let resultArray = strArray.map((itemText, index) => {
          // 把明文轉成 unicode
          let unicode = `${itemText.charCodeAt(0)}`;
          let unicodeArray = unicode.split('');

          // 將 unicode 代碼補 0（5位數）
          const supValue = 0 - (unicodeArray.length - this.process.digits);

          for (let i = 0; i < supValue; i++) {
            unicodeArray.unshift('0');
          }

          // 取得「公用常數」與「私用常數」的乘積，並做凱薩密碼處理
          const privateConst = index % 10;
          const privatePrime = this.process.prime[privateConst];
          const publicPrime = this.process.prime[publicConst];
          const result = this.encodeCaesarCipher(unicodeArray, privatePrime * publicPrime);

          return result;
        });

        // 將公用常數添加至密文裡面
        resultArray.push(publicConst);
        return resultArray.join('');
      },
      // * 解碼
      decodeHandler(payload) {
        // 判斷傳入值是否為數字
        let isError = parseInt(payload) ? false : true;

        if (isError === true) {
          return 'error';
        }

        // 取得密文裡的公用常數，並將密文轉成陣列
        let strArray = payload.split('');
        const publicConst = parseInt(strArray[strArray.length - 1]);
        strArray.splice(strArray.length - 1, 1);

        // 把密文陣列以每 5 個字串組成新陣列
        let codeArray = [];

        for (let i = 0; i < strArray.length; i += this.process.digits) {
          codeArray.push(strArray.slice(i, i + this.process.digits).join(''));
        }

        // 取得公用常數值與私用常數值乘積列表
        const publicPrime = this.process.prime[publicConst];
        const keysArray = this.process.prime.map(prime => prime * publicPrime);

        // 處理並轉換密文
        const resultArray = codeArray.map((cipherCode, index) => {
          let cipherCodeArray = cipherCode.split('');
          let plainCode = '';

          // 將乘積列表全部帶進凱薩密碼驗證
          for (let i = 0; i < keysArray.length; i++) {
            let _plainCode = this.decodeCaesarCipher(cipherCodeArray, keysArray[i]);
            if (index % 10 === i) {
              plainCode = _plainCode;
              break;
            }
          }

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
      getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      // 驗證是否為 Unicode 值
      validateNumberValue(payload) {
        return payload <= 65535 || payload >= 32 || payload === 10 ? true : false;
      },
      // 凱薩密碼轉換（編碼）
      // (型別：payload: Array、offset: Number、output: String)
      encodeCaesarCipher(payload, offset) {
        let resultArray = payload.map((item, index) => {
          let vector = index + 1 === 5 ? (index + 2) : (index + 1);
          return (parseInt(item) + (offset * vector)) % 10;
        });
        return resultArray.join('');
      },
      // 凱薩密碼轉換（解碼）
      // (型別：payload: Array、offset: Number、output: String)
      decodeCaesarCipher(payload, offset) {
        let resultArray = payload.map((item, index) => {
          let result = null;
          let vector = index + 1 === 5 ? (index + 2) : (index + 1);

          for (let i = 0; i < 10; i++) {
            if (((i + (offset * vector)) % 10) === parseInt(item)) {
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