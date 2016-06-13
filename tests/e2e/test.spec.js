describe('page ', function () {

    var godHateInitial = 50;
    var goldPrefer = 6;
    var copperPrefer = 2;
    var somePrefer = 1;

    var getRes = function() {
        var selector = browser.getText('.gift-tunner__bar .bar');

        return {
            goldCount: selector[0],
            copperCount: selector[1],
            someCount: selector[2]
        }
    }

    beforeAll(function() {
        browser.url('/');
    });

    it('should check title', function () {
        var title = browser.getTitle();
        expect(title).toBe('test title');
    });

    it('should inc', function () {
        var resBefore = browser.getText('.user-wealth__resources .resource__val')[0];
        var inc = browser.click('.gift-tunner__controls .tune-controls__inc')[0];

        var bar = browser.getText('.gift-tunner__bar .bar')[0];

        expect(resBefore).toBe('20');
        expect(bar.length).toBe(1);
        var resAfter = browser.getText('.user-wealth__resources .resource__val')[0];
        expect(resAfter).toBe('19');
    });

    it('Should have valid init values', function() {
        var godHate = browser.getText('.god-hate-indicator__bar .bar');

        var goldCount = getRes().goldCount;
        var copperCount = getRes().copperCount;
        var someCount = getRes().someCount;

        expect(goldCount.length).toBe(1);
        expect(copperCount.length).toBe(0);
        expect(someCount.length).toBe(0);
        expect(godHate.length).toBe(godHateInitial - goldPrefer * goldCount.length -
            copperPrefer * copperCount.length - somePrefer * someCount.length);
    });

    it('God hate indicator has changed. Increment', function() {
        var incGold = browser.click('.god-gift-form__tunners > div:first-child ' +
            '.gift-tunner__controls .tune-controls__inc');
        var incCopper = browser.click('.god-gift-form__tunners > div:nth-child(2) ' +
            '.gift-tunner__controls .tune-controls__inc');
        var incSome = browser.click('.god-gift-form__tunners > div:last-child ' +
            '.gift-tunner__controls .tune-controls__inc');


        var goldCount = getRes().goldCount;
        var copperCount = getRes().copperCount;
        var someCount = getRes().someCount;
        var godHate = browser.getText('.god-hate-indicator__bar .bar');

        expect(goldCount.length).toBe(2);
        expect(copperCount.length).toBe(1);
        expect(someCount.length).toBe(1);
        expect(godHate.length).toBe(godHateInitial - goldPrefer * goldCount.length -
            copperPrefer * copperCount.length - somePrefer * someCount.length);
    });

    it('God hate indicator has changed. Decrement', function() {
        var decGold = browser.click('.god-gift-form__tunners > div:first-child' +
            ' .gift-tunner__controls .tune-controls__dec');
        var decCopper = browser.click('.god-gift-form__tunners > div:nth-child(2)' +
            ' .gift-tunner__controls .tune-controls__dec');
        var decSome = browser.click('.god-gift-form__tunners > div:last-child ' +
            '.gift-tunner__controls .tune-controls__dec');

        var goldCount = getRes().goldCount;
        var copperCount = getRes().copperCount;
        var someCount = getRes().someCount;
        var godHate = browser.getText('.god-hate-indicator__bar .bar');

        expect(goldCount.length).toBe(1);
        expect(copperCount.length).toBe(0);
        expect(someCount.length).toBe(0);
        expect(godHate.length).toBe(godHateInitial - goldPrefer * goldCount.length -
            copperPrefer * copperCount.length - somePrefer * someCount.length);
    });
});
