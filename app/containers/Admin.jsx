import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import fetchWPImport from "../utils/fetchWP";

export default function Admin({ wpObject: { api_url, api_nonce } }) {
  const [exampleSetting, setExampleSetting] = useState("");
  const [savedExampleSetting, setSavedExampleSetting] = useState("");
  // Store reference to fetchWP object in state
  const [fetchWP, setFetchWP] = useState(null);

  useEffect(() => {
    const fetchObj = new fetchWPImport({
      restURL: api_url,
      restNonce: api_nonce,
    });
    setFetchWP(fetchObj);
  }, []);

  function getSetting() {
    fetchWP
      .get("example")
      .then(({ value }) => {
        setExampleSetting(value);
        setSavedExampleSetting(value);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!fetchWP) return;
    getSetting();
  }, [fetchWP]);

  function updateSetting() {
    fetchWP.post("example", { exampleSetting }).then(
      (json) => {
        processOkResponse(json, "saved");
        console.log(`${exampleSetting} was saved`);
      },
      (err) => console.log("error", err)
    );
  }

  function deleteSetting() {
    fetchWP.delete("example").then(
      (json) => {
        processOkResponse(json, "deleted");
        console.log(json, " was deleted");
      },
      (err) => console.log("error", err)
    );
  }

  function processOkResponse(json, action) {
    if (json.success) {
      const { value } = json;
      setExampleSetting(value);
      setSavedExampleSetting(value);
    } else {
      console.log(`Setting was not ${action}.`, json);
    }
  }

  function updateInput({ target: { value } }) {
    if (value) {
      setExampleSetting(value);
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (exampleSetting === savedExampleSetting) {
      console.log("Setting unchanged");
    } else {
      updateSetting();
    }
  }

  function handleDelete(event) {
    event.preventDefault();
    deleteSetting();
  }

  return (
    <div className="wrap">
      <form>
        <h1>WP Reactivate Settings</h1>

        <label>
          Example Setting:
          <input type="text" value={exampleSetting} onChange={updateInput} />
        </label>

        <button
          id="save"
          className="button button-primary"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          id="delete"
          className="button button-primary"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

Admin.propTypes = {
  wpObject: PropTypes.object,
};
