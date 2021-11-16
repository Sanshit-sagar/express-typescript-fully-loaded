

type UserExtensions = Partial<{
    hacker: HackerDetails;
    contact: Contact;
    address: Address;
}>
type SkipDictionary = Required<{ 
    [Property in keyof UserExtensions]: boolean; 
}>; 