'use strict';

var nGram;

/**
 * Dependencies.
 */

nGram = require('./');

/**
 * Optional dependencies.
 */

var ngram,
    madbenceNgram,
    hasException;

try {
    madbenceNgram = require('madbence-ngram');
} catch (err) {
    hasException = true;
}

try {
    ngram = require('ngram').ngram;
} catch (err) {
    hasException = true;
}

if (hasException) {
    console.log(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/**
 * Fixtures.
 */

var sentence,
    paragraph,
    article;

sentence = 'A simple sentence with some words, and such.';
paragraph = sentence + Array(5).join(' ' + sentence);
article = paragraph + Array(10).join('\n' + paragraph);

suite('nGram -- this module', function () {
    var getBigrams = nGram(2),
        getTrigrams = nGram(3),
        getTenGrams = nGram(10);

    bench('  bigrams on a sentence', function () {
        getBigrams(sentence);
    });

    bench('  bigrams on an article', function () {
        getBigrams(article);
    });

    bench(' trigrams on a sentence', function () {
        getTrigrams(sentence);
    });

    bench(' trigrams on an article', function () {
        getTrigrams(article);
    });

    bench('ten-grams on a sentence', function () {
        getTenGrams(sentence);
    });

    bench('ten-grams on an article', function () {
        getTenGrams(article);
    });
});

if (madbenceNgram) {
    suite('madbence/ngram', function () {
        bench('  bigrams on a sentence', function () {
            madbenceNgram(sentence, 2, 2);
        });

        bench('  bigrams on an article', function () {
            madbenceNgram(article, 2, 2);
        });

        bench(' trigrams on a sentence', function () {
            madbenceNgram(sentence, 3, 3);
        });

        bench(' trigrams on an article', function () {
            madbenceNgram(article, 3, 3);
        });

        bench('ten-grams on a sentence', function () {
            madbenceNgram(sentence, 10, 10);
        });

        bench('ten-grams on an article', function () {
            madbenceNgram(article, 10, 10);
        });
    });
}

if (ngram) {
    suite('ngram', function () {
        bench('  bigrams on a sentence', function () {
            ngram(sentence, 2, 2);
        });

        bench('  bigrams on an article', function () {
            ngram(article, 2, 2);
        });

        bench(' trigrams on a sentence', function () {
            ngram(sentence, 3, 3);
        });

        bench(' trigrams on an article', function () {
            ngram(article, 3, 3);
        });

        bench('ten-grams on a sentence', function () {
            ngram(sentence, 10, 10);
        });

        bench('ten-grams on an article', function () {
            ngram(article, 10, 10);
        });
    });
}
