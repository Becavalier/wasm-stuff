(module
  (import "env" "memory" (memory $0 1))
  (table 0 anyfunc)
  (export "memory" (memory $0))
  (export "plus" (func $plus))
  (func $plus (param $0 i32) (param $1 i32)
    (block $label$0
      (br_if $label$0
        (i32.lt_s
          (get_local $1)
          (i32.const 1)
        )
      )
      (loop $label$1
        (i32.store
          (get_local $0)
          (i32.const 1)
        )
        (set_local $0
          (i32.add
            (get_local $0)
            (i32.const 4)
          )
        )
        (br_if $label$1
          (tee_local $1
            (i32.add
              (get_local $1)
              (i32.const -1)
            )
          )
        )
      )
    )
  )
)
