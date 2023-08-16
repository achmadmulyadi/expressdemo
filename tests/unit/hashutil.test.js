const {hash, verify}=require('../../utils/hashutil');

describe('Hashing algorithm test',()=>{
    it('should return non null value',async ()=>{
        const password='t4sp3n';
        const hashPassword=await hash(password);
        expect(hashPassword).toBeTruthy();
    });
    
    it('should pass if password match',async ()=>{
        const password='t4sp3n';
        const testPassword='t4sp3n';
        const hashPassword=await hash(password);
        const result=await verify(testPassword,hashPassword);
        expect(result).toBe(true);
    });
    
    it('should fail if password doesnt match',async ()=>{
        const password='t4sp3n';
        const testPassword='otherPassword';
        const hashPassword=await hash(password);
        const result=await verify(testPassword,hashPassword);
        expect(result).toBe(false);
    })
})
