declare module meetup {    
    export interface Venue {
        country: string;
        localized_country_name: string;
        city: string;
        address_1: string;
        address_2: string;
        name: string;
        lon: number;
        id: number;
        lat: number;
        repinned: boolean;
    }

    export interface Group {
        join_mode: string;
        created: any;
        name: string;
        group_lon: number;
        id: number;
        urlname: string;
        group_lat: number;
        who: string;
    }

    export interface Result {
        utc_offset: number;
        venue: Venue;
        rsvp_limit: number;
        headcount: number;
        visibility: string;
        waitlist_count: number;
        created: any;
        maybe_rsvp_count: number;
        description: string;
        how_to_find_us: string;
        event_url: string;
        yes_rsvp_count: number;
        duration: number;
        announced: boolean;
        name: string;
        id: string;
        photo_url: string;
        time: any;
        updated: any;
        group: Group;
        status: string;
    }

    export interface Meta {
        next: string;
        method: string;
        total_count: number;
        link: string;
        count: number;
        description: string;
        lon: string;
        title: string;
        url: string;
        id: string;
        updated: number;
        lat: string;
    }

    export interface eventResults {
        results: Result[];
        meta: Meta;
    }

    export interface PhotoResults {
        results: PhotoResult[];
        meta:    Meta;
    }
     
    export interface PhotoResult {
        utc_offset:   number;
        site_link:    string;
        highres_link: string;
        photo_id:     number;
        created:      number;
        base_url:     string;
        caption?:     string;
        type:         string;
        thumb_link:   string;
        photo_album:  PhotoAlbum;
        member:       Member;
        photo_link:   string;
        updated:      number;
    }
    
    export interface Member {
        member_id: number;
        name:      string;
    }

    
    export interface PhotoAlbum {
        photo_album_id: number;
        group_id:       number;
        event_id?:      string;
    }
}

