; (function (Vue) {

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
                    digits: 7
                }
            }
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
                const resultArray = strArray.map((item) => {
                    let unicode = item.charCodeAt(0);
                    let randomCode = this.getRandomArbitrary(1, 4) * 2;
                    let cipherCode = (unicode * randomCode) / 2;
                    let codeArray = `${cipherCode}`.split('');
                    let sup = 0 - (codeArray.length - this.process.digits);

                    for (let i = 0; i < sup; i++) {
                        if (i === sup - 1) {
                            codeArray.unshift(`${randomCode}`);
                        } else {
                            codeArray.unshift('0');
                        }
                    }

                    return codeArray.join('');
                });

                return resultArray.join('');
            },
            decodeHandler(payload) {
                let isError = parseInt(payload) ? false : true;

                if (isError === true) {
                    return 'error'
                }

                const strArray = payload.split('');
                const codeArray = [];

                for (let i = 0; i < strArray.length; i += this.process.digits) {
                    codeArray.push(strArray.slice(i, i + this.process.digits).join(''));
                }

                const resultArray = codeArray.map((item) => {
                    const cipherNumber = parseInt(item.slice(1, this.process.digits));
                    const keyNumber = parseInt(item.slice(0, 1));

                    const plainNumber = (cipherNumber * 2) / keyNumber;

                    if (isError === false) {
                        isError = !this.validateNumberValue(plainNumber);
                    }

                    const plainText = String.fromCharCode(`${plainNumber}`);

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
    }

    const vm = new Vue({
        render: h => h(app)
    }).$mount('#app');

})(Vue);