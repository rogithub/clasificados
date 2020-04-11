
export class GuidService {
    public static emtpy = "00000000-0000-0000-0000-000000000000";

    public static hasValue = (guid?: string) => {
        if (guid === null || guid === undefined) {
            return false;
        }

        if (guid === GuidService.emtpy) {
            return false;
        }

        return guid.length === 36;
    }

    public static toNullable = (guid?: string): string | null => {

        if (GuidService.hasValue(guid)) {
            return guid;
        }

        return null;
    }
}
