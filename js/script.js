function nextSlide(current) {
  const currentStep = document.getElementById(`step${current}`);
  const nextStep = document.getElementById(`step${current + 1}`);
  if (currentStep && nextStep) {
    currentStep.classList.remove("active");
    nextStep.classList.add("active");
  }
}

function prevSlide(current) {
  const currentStep = document.getElementById(`step${current}`);
  const prevStep = document.getElementById(`step${current - 1}`);
  if (currentStep && prevStep) {
    currentStep.classList.remove("active");
    prevStep.classList.add("active");
  }
}

