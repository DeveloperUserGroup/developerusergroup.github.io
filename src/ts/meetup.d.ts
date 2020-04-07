declare module meetup {
    export interface MemberPhoto {
        id: number;
        highres_link: string;
        photo_link: string;
        thumb_link: string;
        type: string;
        base_url: string;
    }

    export interface Member {
        id: number;
        name: string;
        bio: string;
        photo: MemberPhoto;
        role: string;
    }

    export interface Photo {
        id: number;
        highres_link: string;
        photo_link: string;
        thumb_link: string;
        type: string;
        base_url: string;
        link: string;
        created: any;
        updated: any;
        utc_offset: number;
        member: Member;
        caption: string;
    }

    export interface Venue {
        id: number;
        name: string;
        repinned: boolean;
        country: string;
        localized_country_name: string;
        lat?: number;
        lon?: number;
        address_1: string;
        city: string;
        address_2: string;
    }

    export interface Group {
        created: any;
        name: string;
        id: number;
        join_mode: string;
        lat: number;
        lon: number;
        urlname: string;
        who: string;
        localized_location: string;
        state: string;
        country: string;
        region: string;
        timezone: string;
    }

    export interface Event {
        created: any;
        duration: number;
        id: string;
        name: string;
        date_in_series_pattern: boolean;
        status: string;
        time: any;
        local_date: string;
        local_time: string;
        updated: any;
        utc_offset: number;
        waitlist_count: number;
        yes_rsvp_count: number;
        venue: Venue;
        group: Group;
        link: string;
        description: string;
        visibility: string;
        member_pay_fee: boolean;
        how_to_find_us: string;
    }

    export interface Meta {
        total_count: number,
        next_link: string,
    }

    export interface Events {
        data: Event[];
        meta: Meta,
    }

    export interface Photos {
        data: Photo[];
        meta: Meta,
    }
}

