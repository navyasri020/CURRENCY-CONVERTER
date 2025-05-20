const amountEl = document.getElementById('amount');
    const fromEl = document.getElementById('fromCurrency');
    const toEl = document.getElementById('toCurrency');
    const resultEl = document.getElementById('result');
    const historyEl = document.getElementById('history');
    let rates = {};

    const flagMap = {
      USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵', AUD: '🇦🇺', CAD: '🇨🇦', CHF: '🇨🇭',
      CNY: '🇨🇳', INR: '🇮🇳', RUB: '🇷🇺', BRL: '🇧🇷', ZAR: '🇿🇦', MXN: '🇲🇽', KRW: '🇰🇷',
      TRY: '🇹🇷', SGD: '🇸🇬', HKD: '🇭🇰', NZD: '🇳🇿', SEK: '🇸🇪', NOK: '🇳🇴', DKK: '🇩🇰',
      PLN: '🇵🇱', ILS: '🇮🇱', THB: '🇹🇭', MYR: '🇲🇾', IDR: '🇮🇩', PHP: '🇵🇭', CZK: '🇨🇿',
      HUF: '🇭🇺', CLP: '🇨🇱', PKR: '🇵🇰', AED: '🇦🇪', COP: '🇨🇴', SAR: '🇸🇦', VND: '🇻🇳',
      EGP: '🇪🇬', NGN: '🇳🇬', KWD: '🇰🇼', QAR: '🇶🇦', BDT: '🇧🇩', LKR: '🇱🇰', RON: '🇷🇴',
      UAH: '🇺🇦', DZD: '🇩🇿', MAD: '🇲🇦', OMR: '🇴🇲'
    };

    async function fetchRates() {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await res.json();
      rates = data.rates;

      Object.keys(rates).forEach(code => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = code;
        option1.textContent = `${flagMap[code] || ''} ${code}`;
        option2.textContent = `${flagMap[code] || ''} ${code}`;
        fromEl.appendChild(option1);
        toEl.appendChild(option2);
      });
 new TomSelect('#fromCurrency', { placeholder: 'From Currency' });
      new TomSelect('#toCurrency', { placeholder: 'To Currency' });

      fromEl.value = 'USD';
      toEl.value = 'INR';
    }

    function convertCurrency() {
      const amount = parseFloat(amountEl.value);
      if (isNaN(amount) || amount <= 0) {
        resultEl.textContent = 'Please enter a valid amount.';
        return;
      }

      const from = fromEl.value;
      const to = toEl.value;
      const converted = (amount / rates[from]) * rates[to];
      const text = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      resultEl.textContent = text;

      const historyItem = document.createElement('div');
      historyItem.textContent = text;
      historyEl.prepend(historyItem);
    }

    function swapCurrencies() {
      const temp = fromEl.value;
      fromEl.value = toEl.value;
      toEl.value = temp;
      convertCurrency();
    }

    function toggleTheme() {
      document.body.classList.toggle('light');
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    }

    function loadTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light');
      }
      amountEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') convertCurrency();
    });
  }
    loadTheme();
    fetchRates();