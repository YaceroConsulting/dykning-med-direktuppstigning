/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

// derived from file expositionstid.json
type DiveData = {
    depth: number
    combinations: Array<Combination>
}

type Combination = {
    time_submerged: number
    dive_group: string
}

// derived from file ytintervall.json
type Surface = {
    A: SurfaceGroup
    B: SurfaceGroup
    C: SurfaceGroup
    D: SurfaceGroup
    E: SurfaceGroup
    F: SurfaceGroup
    G: SurfaceGroup
    H: SurfaceGroup
    I: SurfaceGroup
    J: SurfaceGroup
    K: SurfaceGroup
    L: SurfaceGroup
    M: SurfaceGroup
    N: SurfaceGroup
    O: SurfaceGroup
    Z: SurfaceGroup
}

type SurfaceGroup = {
    surface_interval: SurfaceInterval[]
}

type SurfaceInterval = {
    hours: number
    minutes: number
    non_repeat?: boolean
}
