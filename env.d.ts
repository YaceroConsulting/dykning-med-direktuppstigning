/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />


// derived from file expositionstid.json
type DiveData = {
    depth:        number;
    combinations: Array<Combination>;
}

type Combination = {
    time_submerged: number
    dive_group:     string
}