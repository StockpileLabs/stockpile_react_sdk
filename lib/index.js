"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SDK: () => import_sdk2.SDK,
  StockpileProvider: () => StockpileProvider,
  useCreateProject: () => useCreateProject,
  useCreateUser: () => useCreateUser,
  useProject: () => useProject,
  useStockpile: () => useStockpile,
  useStockpileContext: () => useStockpileContext,
  useUser: () => useUser
});
module.exports = __toCommonJS(src_exports);

// src/hooks/project/useCreateProject.ts
var import_react = require("react");
var useCreateProject = (sdk) => {
  const [projectPDA, setProjectPDA] = (0, import_react.useState)(null);
  const [isCreatingProject, setIsCreatingProject] = (0, import_react.useState)(false);
  const [createProjectError, setcreateProjectError] = (0, import_react.useState)(null);
  const create = (0, import_react.useCallback)(
    async (name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner, sendTransaction, connection, options) => {
      setIsCreatingProject(true);
      setcreateProjectError(null);
      try {
        const ixMethodBuilder = await createProjectIxMethodBuilder(name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner);
        const tx = await ixMethodBuilder?.transaction();
        if (sendTransaction) {
          if (tx) {
            return await sendTransaction(tx, connection, options);
          }
        } else {
          return await ixMethodBuilder?.rpc();
        }
      } catch (err) {
        setcreateProjectError(err);
      } finally {
        setIsCreatingProject(false);
      }
    },
    [sdk]
  );
  const createProjectIxMethodBuilder = (0, import_react.useCallback)(
    async (name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner) => {
      setcreateProjectError(null);
      try {
        const data = await sdk.project.create(name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner);
        setProjectPDA(data.fundraiserPDA);
        return data.instructionMethodBuilder;
      } catch (err) {
        setcreateProjectError(err);
        return null;
      }
    },
    [sdk]
  );
  return {
    create,
    createProjectIxMethodBuilder,
    projectPDA,
    isCreatingProject,
    createProjectError
  };
};

// src/hooks/project/useProject.ts
var import_react2 = require("react");
var useProject = (sdk, projectAccount) => {
  const [project, setProject] = (0, import_react2.useState)(null);
  const [projectLoading, setProjectLoading] = (0, import_react2.useState)(false);
  const [projectError, setProjectError] = (0, import_react2.useState)(null);
  const fetchProject = (0, import_react2.useCallback)(
    async () => {
      setProjectLoading(true);
      setProjectError(null);
      try {
        const data = await sdk.project.get(projectAccount);
        setProject(data);
      } catch (err) {
        setProjectError(err);
      } finally {
        setProjectLoading(false);
      }
    },
    [sdk, projectAccount]
  );
  (0, import_react2.useEffect)(() => {
    fetchProject();
  }, []);
  return { project, projectLoading, projectError };
};

// src/hooks/useStockpile.ts
var import_react3 = require("react");
var import_sdk = require("@stockpileprotocol/sdk");
var useStockpile = (wallet, connection, opts, cluster) => {
  const sdk = (0, import_react3.useMemo)(() => {
    return new import_sdk.SDK(wallet, connection, opts, cluster);
  }, [wallet]);
  return sdk;
};

// src/hooks/user/useUser.ts
var import_react4 = require("react");
var useUser = (sdk, userAccount) => {
  const [user, setUser] = (0, import_react4.useState)(null);
  const [userLoading, setUserLoading] = (0, import_react4.useState)(false);
  const [userError, setUserError] = (0, import_react4.useState)(null);
  const fetchUser = (0, import_react4.useCallback)(
    async () => {
      setUserLoading(true);
      setUserError(null);
      try {
        const data = await sdk.user.get(userAccount);
        setUser(data);
      } catch (err) {
        setUserError(err);
      } finally {
        setUserLoading(false);
      }
    },
    [sdk, userAccount]
  );
  (0, import_react4.useEffect)(() => {
    fetchUser();
  }, []);
  return { user, userLoading, userError };
};

// src/hooks/user/useCreateUser.ts
var import_react5 = require("react");
var useCreateUser = (sdk) => {
  const [isCreatingUser, setIsCreatingUser] = (0, import_react5.useState)(false);
  const [createUserError, setCreateUserError] = (0, import_react5.useState)(null);
  const create = (0, import_react5.useCallback)(
    async (username, image, owner) => {
      setIsCreatingUser(true);
      setCreateUserError(null);
      try {
        const data = await createUserIxMethodBuilder(username, image, owner);
        await data?.instructionMethodBulder.rpc();
      } catch (err) {
        setCreateUserError(err);
      } finally {
        setIsCreatingUser(false);
      }
    },
    [sdk]
  );
  const createUserIxMethodBuilder = (0, import_react5.useCallback)(
    async (username, image, owner) => {
      setCreateUserError(null);
      try {
        const user = await sdk.user.create(username, image, owner);
        const data = {
          instructionMethodBulder: user.instructionMethodBuilder,
          userPDA: user.userPDA
        };
        return data;
      } catch (err) {
        setCreateUserError(err);
        return null;
      }
    },
    [sdk]
  );
  return {
    create,
    createUserIxMethodBuilder,
    isCreatingUser,
    createUserError
  };
};

// src/providers/StockpileContext.tsx
var React = __toESM(require("react"));
var import_react6 = require("react");
var StockpileContext = (0, import_react6.createContext)(null);
var StockpileProvider = ({ children, sdk }) => {
  return /* @__PURE__ */ React.createElement(StockpileContext.Provider, { value: { sdk } }, children);
};
var useStockpileContext = () => {
  const context = (0, import_react6.useContext)(StockpileContext);
  if (!context) {
    throw new Error("useStockpileContext must be used within a StockpileProvider");
  }
  return context;
};

// src/index.ts
var import_sdk2 = require("@stockpileprotocol/sdk");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SDK,
  StockpileProvider,
  useCreateProject,
  useCreateUser,
  useProject,
  useStockpile,
  useStockpileContext,
  useUser
});
