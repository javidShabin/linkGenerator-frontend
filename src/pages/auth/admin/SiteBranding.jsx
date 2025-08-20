import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../configs/axiosInstance";
import { useBranding } from "../../../context/BrandingContext";

const SiteBranding = () => {
  const { setBranding } = useBranding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      buttonColor: "#a855f7",
      logoText: "",
      logoColor: "#ffffff",
      textColor: "#ffffff",
    },
  });

  const buttonColor = watch("buttonColor");

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const res = await axiosInstance.get("/branding/site");
       
        const data = res?.data?.data || res?.data || {};
        reset({
          buttonColor: data.buttonColor || "#a855f7",
          logoText: data.logoText || "",
          logoColor: data.logoColor || "#ffffff",
          textColor: data.textColor || "#ffffff",
        });
      } catch (e) {
        // Non-blocking: form still usable with defaults
      }
    };
    fetchBranding();
  }, [reset]);

  const logoPreviewUrl = useMemo(() => {
    if (!logoFile) return null;
    return URL.createObjectURL(logoFile);
  }, [logoFile]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (values.buttonColor) formData.append("buttonColor", values.buttonColor);
      if (values.logoText !== undefined) formData.append("logoText", values.logoText);
      if (values.logoColor) formData.append("logoColor", values.logoColor);
      if (values.textColor) formData.append("textColor", values.textColor);
      if (logoFile) formData.append("logo", logoFile);

      const res = await axiosInstance.patch("/branding/site", formData);
      console.log(res, "=====nono")
      const data = res?.data?.data || res?.data || {};

      setBranding((prev) => ({
        ...prev,
        buttonColor: data.buttonColor ?? values.buttonColor,
        logoText: data.logoText ?? values.logoText,
        logoUrl: data.logoUrl ?? prev.logoUrl,
        logoColor: data.logoColor ?? values.logoColor,
        textColor: data.textColor ?? values.textColor,
      }));

      toast.success("Branding updated");
    } catch (e) {
      toast.error("Failed to update branding");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070510] text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-purple-400">Site Branding</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">Button Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-10 w-14 p-1 bg-transparent rounded"
                  value={buttonColor || "#a855f7"}
                  onChange={(e) => setValue("buttonColor", e.target.value, { shouldDirty: true })}
                />
                <input
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                  {...register("buttonColor", { required: true })}
                />
              </div>
              {errors.buttonColor && (
                <p className="text-xs text-red-400 mt-1">Button color is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Logo Text</label>
              <input
                placeholder="Enter logo text"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                {...register("logoText")}
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Logo Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-10 w-14 p-1 bg-transparent rounded"
                  value={watch("logoColor") || "#ffffff"}
                  onChange={(e) => setValue("logoColor", e.target.value, { shouldDirty: true })}
                />
                <input
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                  {...register("logoColor", { required: true })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Header Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-10 w-14 p-1 bg-transparent rounded"
                  value={watch("textColor") || "#ffffff"}
                  onChange={(e) => setValue("textColor", e.target.value, { shouldDirty: true })}
                />
                <input
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                  {...register("textColor", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="block text-sm text-white/70 mb-2">Logo Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="w-full text-white"
              />
              <p className="text-xs text-white/50 mt-1">Uploading a logo image overrides logo text.</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/60">Preview</span>
              <div className="px-4 py-2 rounded-full shadow"
                   style={{ backgroundColor: buttonColor || "#a855f7" }}>
                <span className="text-white font-semibold">Get started</span>
              </div>
              {logoPreviewUrl && (
                <img src={logoPreviewUrl} alt="Logo preview" className="mt-2 h-10 object-contain" />
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-6 py-3 rounded-lg font-bold shadow-lg transition-colors duration-300 ${
                isSubmitting ? "bg-purple-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Branding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteBranding;


