# DESEN

## Design the interface that ships.

DESEN is an open protocol and Web/React reference implementation for a model in which designers
author production interfaces as validated data—rather than handing static design files to
developers for reimplementation.

**Why the name DESEN?**

The name comes from **DES**ign **EN**vironment. It expresses the long-term vision behind the
project: design should not end as a static artifact waiting to be rebuilt. DESEN is intended to be
the shared environment where designers compose production experiences and applications safely
execute them through capabilities defined by developers.

**Traditional workflow**

`Design file → Handoff → Frontend rebuild → Drift`

**DESEN**

`Product capabilities → Authoring → Validated bundle → Application runtime`

The designer owns the experience composition. The developer owns the trusted components,
operations, and platform.

## The first proof

We are building one deliberately narrow vertical slice:

A sign-in surface is authored, validated, published, and activated in a separately built React
application—without recreating the same screen as a second React component tree.

> **Status:** public, early-stage implementation.
>
> DESEN 0.1.0 is frozen as the current proof baseline, not a stable standard.

[See the architecture](https://github.com/desenlab/desen-app/blob/main/docs/architecture/ARCHITECTURE.md)
· [Read the protocol](https://github.com/desenlab/desen-protocol)
· [Challenge an assumption](https://github.com/desenlab/desen-app/issues/new)

---

![Traditional handoff compared with the DESEN delivery flow](./assets/desen-flow.svg)

## Build status

The framework-neutral runtime core is currently under construction. Progress below is synchronized
from the public implementation repository.

<!-- desen-progress:start -->

**Overall:** `███████████████░░░░░░░░░░` **89 / 145 tasks complete (61%)**

**M07 complete:** `███████████` **11 / 11 tasks complete (100%)**

**Proof gates:** **8 / 13 complete** · **I07-04:** `DONE` (`20 / 20`, zero false negatives) · **G07:** `DONE` · **Next:** `M08-T05`

[Follow the detailed task board](https://github.com/desenlab/desen-app/blob/main/docs/plan/TASKS.md)

<!-- desen-progress:end -->

The repository is open for scrutiny before it is ready for adoption. Questions, counterexamples,
and challenges to the model are welcome.
