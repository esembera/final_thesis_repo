import React, { useState, useContext } from "react";
import app from "../../../Auth/base";
import { useHistory } from "react-router-dom";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import "../auth.css";
import { ToastContext } from "../../Shared/Toast";

const Register = () => {
  const history = useHistory();

  const { toastRef } = useContext(ToastContext);

  const [loading, setLoading] = useState(false);
  const onSignUp = (data) => {
    setLoading(true);
    if (data.password !== data.repeatedPassword) {
      setLoading(false);
      toastRef.current.show({
        severity: "error",
        summary: "Krivo upisana zaporka",
        detail: "Zaporka i ponovljena zaporka nisu iste",
      });
    } else {
      app
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(
          () => {
            history.push("/");
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            if (error.code === "auth/weak-password") {
              toastRef.current.show({
                severity: "error",
                summary: "Slaba zaporka",
                detail: "Lozinka treba imati barem 6 znakova",
              });
            }
            if (error.code === "auth/email-already-in-use") {
              toastRef.current.show({
                severity: "error",
                summary: "E-mail se već koristi",
                detail: "Upisana e-mail adresa se već koristi od strane drugog računa",
              });
            }
          }
        );
    }
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
      <Card className="card-container" title="Registrirajte se">
        <form onSubmit={handleSubmit(onSignUp)} className="grid p-fluid p-formgrid form-layout">
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
                  />
                )}
              />
              <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                Zaporka*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          <div className="p-field col-12">
            <span className="p-float-label mt-2">
              <Controller
                name="repeatedPassword"
                control={control}
                rules={{ required: "Ponovljena zaporka je obavezna." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="repeatedPassword" className={classNames({ "p-error": errors.repeatedPassword })}>
                Ponovi zaporku*
              </label>
            </span>
            {getFormErrorMessage("repeatedPassword")}
          </div>

          <div className="col-12 flex justify-content-center">
            <div>
              <Button type="submit" label="Registriraj se" className="mt-2" loading={loading} />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
