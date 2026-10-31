// Mostra o texto em ingles ou portugues: ?lang=pt|en, a escolha anterior ou o idioma do navegador.
// Sem JavaScript fica a versao em ingles (a em portugues comeca escondida).
(function () {
  var stored = null;

  try {
    stored = localStorage.getItem('lolcards-lang');
  } catch (error) {
    stored = null;
  }

  var param = new URLSearchParams(window.location.search).get('lang');
  var browser = (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';

  function apply(next) {
    var lang = next === 'pt' ? 'pt' : 'en';

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-lang]').forEach(function (element) {
      element.hidden = element.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-set-lang') === lang));
    });

    var title = document.querySelector('meta[name="title-' + lang + '"]');

    if (title) {
      document.title = title.getAttribute('content');
    }

    try {
      localStorage.setItem('lolcards-lang', lang);
    } catch (error) {
      // Navegador sem armazenamento: so nao lembra a escolha.
    }
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.getAttribute('data-set-lang'));
    });
  });

  apply(param || stored || browser);
})();
