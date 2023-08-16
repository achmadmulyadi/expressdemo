const parseSorting=require('../../utils/parseSorting');

describe('Sorting syntax parser',()=>{
    it('should return a value with ORDER BY prefix',()=>{
        const sortParam=`[{"selector":"ID","desc":true}]`;
        const sorting=parseSorting(sortParam);
        expect(sorting).toMatch(/ORDER/);
    })

})