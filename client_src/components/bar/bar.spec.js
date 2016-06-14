var Bar = require('./bar.js');

describe('Bar component test', function() {
    beforeEach(function() {
        this.bar = new Bar({
            model: {
                getCount: function() {
                    return 5;
                },
                subscribe: function() {
                    this.getCount();
                }
            }
        });

        spyOn(this.bar, 'getCount');
        App.templates['bar'] = jasmine.createSpy();
    });

    describe('Method render', function() {
        it('Method render should be defined', function() {
            expect(this.bar.render).toBeDefined();
        });

        it('Method render should be called', function() {
            this.bar.render();
            expect(App.templates['bar']).toHaveBeenCalled();
        });

        it('Method render should be called with arguments', function() {
            this.bar.render();
            expect(App.templates['bar']).toHaveBeenCalledWith({
                progress: Array(5)
            });
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