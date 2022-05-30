import React, { useState, useContext, useEffect } from "react";
import app from "../../../base";
import { useHistory } from "react-router-dom";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import "../auth.css";
import { ToastContext } from "../../../Toast";

const Login = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { toastRef } = useContext(ToastContext);

  const onLogin = (data) => {
    setLoading(true);
    app
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(
        () => {
          history.push("/");
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          if (error.code === "auth/wrong-password") {
            toastRef.current.show({
              severity: "error",
              summary: "Pogrešni podaci",
              detail: "Upisali ste pogrešnu zaporku ili traženi korisnik nema zaporku",
            });
          }
          if (error.code === "auth/user-not-found") {
            toastRef.current.show({
              severity: "error",
              summary: "Nepostojeći korisnik",
              detail: "Upisali ste e-mail korisnika koji ne postoji",
            });
          }
          if (error.code === "auth/too-many-requests") {
            toastRef.current.show({
              severity: "error",
              summary: "Previše neuspjelih prijava",
              detail: "Vaš račun je privremeno blokiran zbog previše neuspjelih prijava",
            });
          }
        }
      );
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  return (
    <div className="flex justify-content-center m-4">
      <Card className="card-container" title="Prijavite se">
        <form onSubmit={handleSubmit(onLogin)} className="grid p-fluid p-formgrid form-layout">
          <div className="p-field col-12">
            <span className="p-float-label">
              <Controller
                name="email"
                control={control}
                rules={{ required: "E-mail je obavezan." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    type="text"
                  />
                )}
              />
              <label htmlFor="email" className={classNames({ "p-error": errors.email })}>
                E-mail*
              </label>
            </span>
            {getFormErrorMessage("email")}
          </div>

          <div className="p-field col-12">
            <span className="p-float-label mt-2">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Zaporka je obavezna." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    feedback={false}
                  />
                )}
              />
              <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                Zaporka*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          <div className="col-12 flex justify-content-center">
            <div>
              <Button type="submit" label="Prijavi se" className="mt-2" loading={loading} />
            </div>
          </div>

          <div className="col-12 flex justify-content-center mt-2 pb-0 mb-0">
            <div>
              Nemate profil?{" "}
              <b style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => history.push("/register")}>
                Registrirajte se!
              </b>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
