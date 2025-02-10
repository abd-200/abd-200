function ShowModel(modelName) {
    // تعديل: استخدام .SendMessage مع اسم الكائن واسم الدالة الصحيحين
    UnityInstance.SendMessage('SceneManager', 'ShowModel', modelName);
}