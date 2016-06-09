var Bar = require('./bar.js');

describe('Bar component test', function() {
    beforeEach(function() {
        this.bar = new Bar({
            model: {
                getCount: function() {},
                subscribe: function() {
                    this.getCount();
                }
            }
        });

        spyOn(this.bar, 'getCount');
    });

    describe('Method render', function() {
        it('Method render should be defined', function() {
            expect(this.bar.render).toBeDefined();
        });
    });

    describe('Elem', function() {
        it('Elem should be defined', function() {
            expect(this.bar.elem).toBeDefined();
        });
    });

    describe('Method getCount', function() {
        it('getCount should be defined', function() {
            expect(this.bar.getCount).toBeDefined();
        });
    });
});