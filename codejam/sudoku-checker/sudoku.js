'use strict'
/*eslint-env node, es6 */

const Transform = require('stream').Transform;
const util = require('util');
const split = require('split');
const _ = require('underscore');

class ProblemStream {
    constructor() {
        Transform.call(this, {"objectMode": true})

        this.numberOfProblems = null;
        this.puzzleSize = null;
        this.currentPuzzle = null;
    }
    _transform (line, encoding, processed) {
        if (!this.numberOfProblems) {
            this.numberOfProblems = line;
        } else if (!this.puzzleSize) {
            this.puzzleSize = parseInt(line) * parseInt(line);
            this.currentPuzzle = [];
        } else {
            const numbers = line.split(/\s+/);
            this.currentPuzzle.push(numbers);
            this.puzzleSize--;

            if (this.puzzleSize === 0 ) {
                this.push(this.currentPuzzle);
                this.puzzleSize = null;
            }
        }
        processed();

    }
}
util.inherits(ProblemStream, Transform);

class SolveStream {
    constructor() {
        Transform.call(this, {"objectMode": true})
    }
    _transform (array, encoding, processed) {
        const solution = this.solve(array);
        console.log(solution);
        this.push(solution);
        processed();
    }
    solve (sudokuArray) {
        const length = sudokuArray[0].length;
        const leg = Math.sqrt(length);
        var rows = [];
        var columns = [];
        var quadrants = [];

        _(length).times(n => {
            rows.push([]);
            columns.push([]);
            quadrants.push([]);
        });

        for (var i = 0; i<length; i++) {
            for (var j = 0; j<length; j++) {
                const value = sudokuArray[i][j]
                const quadrantsIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

                quadrants[quadrantsIndex].push(value);
                rows[i].push(value);
                columns[j].push(value);
            }
        }

        //todo: validate

        return true;
    }
}
util.inherits(SolveStream, Transform);

class OutputStream {
    constructor() {
        Transform.call(this, {"objectMode": true})
    }
    _transform (array, encoding, processed) {
        this.push('hit');
        processed();
    }
}
util.inherits(OutputStream, Transform);

process.stdin
    .pipe(split())
    .pipe(new ProblemStream())
    .pipe(new SolveStream())
    .pipe(new OutputStream())
    .pipe(process.stdout);

