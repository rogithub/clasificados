import { JsonReq } from '../../services/jsonReq';

describe('Component', () => {

    let window;
    let service: JsonReq;
    let response = {
        json: () => 1
    }

    beforeEach(() => {
        window = jasmine.createSpyObj("window", ["fetch"]);
        window.fetch = jasmine.createSpy("fetch").and.resolveTo(response);
        service = new JsonReq("localhost:80", window);
    });

    describe('response', () => {
        it("should get data", async (done) => {
            let n = await service.get<number>("/get");
            expect(n).toBe(1);

            done();
        });
        it("should post data", async (done) => {
            let n = await service.post<number>("/post", { data: "test" });
            expect(n).toBe(1);

            done();
        });
        it("should put data", async (done) => {
            let n = await service.put<number>("/put/1", { data: "test" });
            expect(n).toBe(1);

            done();
        });
        it("should patch data", async (done) => {
            let n = await service.patch<number>("/patch/1", { data: "test" });
            expect(n).toBe(1);

            done();
        });
        it("should delete data", async (done) => {
            let n = await service.del<number>("/delete/1");
            expect(n).toBe(1);

            done();
        });
    });

});
