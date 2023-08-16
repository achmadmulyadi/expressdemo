const parseFilter=require('../../utils/parseFilter');

describe('Sorting syntax parser',()=>{
    it('should return a value with WHERE prefix',()=>{
        const whereParam=`[["LOG_DATE_TIME",">=","2021-09-02+00:00:00"],"and",["LOG_DATE_TIME","<","2021-09-03+00:00:00"]]`;
        const filter=parseFilter(JSON.parse(whereParam));
        expect(filter).toBe("(LOWER(LOG_DATE_TIME) >= LOWER('2021-09-02+00:00:00')) and (LOWER(LOG_DATE_TIME) < LOWER('2021-09-03+00:00:00')) ")
    })

})